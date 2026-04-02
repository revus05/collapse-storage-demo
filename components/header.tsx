"use client";

import { Layers, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { UserMenu } from "./user-menu";

export function Header() {
  const count = useAppSelector((s) => s.assembly.selectedIds.length);
  const pathname = usePathname();

  const activeClass = "text-foreground";
  const inactiveClass = "text-muted-foreground hover:text-foreground transition-colors";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-2 text-sm font-semibold ${pathname === "/" ? activeClass : inactiveClass}`}
          >
            <Package size={16} />
            Заказы
          </Link>

          <Link
            href="/assembly"
            className={`relative flex items-center gap-2 text-sm font-medium ${pathname === "/assembly" ? activeClass : inactiveClass}`}
          >
            <Layers size={16} />
            Комплектация
            {count > 0 && (
              <span className="absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <UserMenu />
      </div>
    </header>
  );
}
