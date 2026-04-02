"use client";

import { ChevronDown, LogOut, Moon, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { clearUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function UserMenu() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  if (!user) return null;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    dispatch(clearUser());
    router.push("/login");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium hover:bg-accent transition-colors">
          <User size={15} className="text-muted-foreground" />
          <span className="text-foreground">{user.name}</span>
          <ChevronDown
            size={13}
            className="text-muted-foreground transition-transform duration-150"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-56 p-0 gap-0 overflow-hidden rounded-xl"
      >
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold leading-tight">{user.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>

          {user.role === "ADMIN" && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
              <ShieldCheck size={11} />
              <span className="text-foreground">Администратор</span>
            </span>
          )}
        </div>

        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Moon size={14} className="text-muted-foreground" />
            <span>Тёмная тема</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none ${isDark ? "bg-primary" : "bg-muted-foreground/30"}`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${isDark ? "translate-x-4.5" : "translate-x-0.75"}`}
            />
          </button>
        </div>

        <div className="p-1">
          <Button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={14} />
            Выйти из аккаунта
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
