"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { OrderPage } from "@/components/order-page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { orders, type OrderStatus } from "@/lib/data";

const statusConfig: { value: OrderStatus; label: string; className: string; activeClassName: string }[] = [
  {
    value: "NEW",
    label: "Новый",
    className: "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300",
    activeClassName: "bg-blue-100 border-blue-300 dark:bg-blue-950 dark:border-blue-700",
  },
  {
    value: "IN_PROGRESS",
    label: "В процессе",
    className: "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300",
    activeClassName: "bg-amber-100 border-amber-300 dark:bg-amber-950 dark:border-amber-700",
  },
  {
    value: "READY",
    label: "Готов",
    className: "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300",
    activeClassName: "bg-emerald-100 border-emerald-300 dark:bg-emerald-950 dark:border-emerald-700",
  },
  {
    value: "IMPORTANT",
    label: "Важный",
    className: "border-red-200 text-red-700 dark:border-red-800 dark:text-red-300",
    activeClassName: "bg-red-100 border-red-300 dark:bg-red-950 dark:border-red-700",
  },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);

  function toggleStatus(value: OrderStatus) {
    setStatusFilter((prev) => (prev === value ? null : value));
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="flex justify-between sm:flex-row flex-col gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Заказы</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {orders.length} заказа
            </p>
          </div>

          <InputGroup className="sm:w-50">
            <InputGroupInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск"
            />
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex flex-wrap gap-2">
          {statusConfig.map((s) => (
            <button
              key={s.value}
              onClick={() => toggleStatus(s.value)}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${s.className} ${statusFilter === s.value ? s.activeClassName : "bg-transparent hover:bg-accent/50"}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <OrderPage search={search} statusFilter={statusFilter} />
      </div>
    </div>
  );
}
