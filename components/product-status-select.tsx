"use client";

import { useState, useTransition } from "react";
import { updateProductStatus } from "@/app/actions";
import type { OrderStatus } from "@/lib/data";

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "NEW", label: "Новый" },
  { value: "IN_PROGRESS", label: "В процессе" },
  { value: "READY", label: "Готов" },
];

const selectColors: Record<OrderStatus, string> = {
  NEW: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-950 dark:border-blue-800",
  IN_PROGRESS:
    "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950 dark:border-amber-800",
  READY:
    "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950 dark:border-emerald-800",
};

export function ProductStatusSelect({
  productId,
  status,
}: {
  productId: string;
  status: OrderStatus;
}) {
  const [current, setCurrent] = useState<OrderStatus>(status);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as OrderStatus;
    setCurrent(newStatus);
    startTransition(() => {
      updateProductStatus(productId, newStatus);
    });
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={isPending}
      onClick={(e) => e.stopPropagation()}
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium border cursor-pointer appearance-none text-center transition-opacity disabled:opacity-50 ${selectColors[current]}`}
    >
      {statusOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
