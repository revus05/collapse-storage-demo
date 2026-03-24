import { Package } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./user-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
        >
          <Package size={16} />
          Заказы
        </Link>

        <UserMenu />
      </div>
    </header>
  );
}
