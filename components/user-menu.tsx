"use client";

import { ChevronDown, LogOut, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clearUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setVariant } from "@/store/variantSlice";

export function UserMenu() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const variant = useAppSelector((state) => state.variant.variant);

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
          <span>{user.name}</span>
          <ChevronDown
            size={13}
            className="text-muted-foreground transition-transform duration-150"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-56 p-0 overflow-hidden rounded-xl"
      >
        {/* User info */}
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold leading-tight">{user.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>

          {user.role === "ADMIN" && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <ShieldCheck size={11} />
              Администратор
            </span>
          )}

          <div className="mt-3">
            <Select
              value={`${variant}`}
              onValueChange={(value) => dispatch(setVariant(+value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Вариант" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Actions */}
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
