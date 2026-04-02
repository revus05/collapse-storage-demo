"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { patchProductStatus } from "@/lib/api";
import type { OrderStatus } from "@/lib/data";

const statusOptionStyles: Record<OrderStatus, { light: React.CSSProperties; dark: React.CSSProperties }> = {
  NEW: {
    light: { backgroundColor: "#eff6ff", color: "#1d4ed8" },
    dark:  { backgroundColor: "#1e3a5f", color: "#93c5fd" },
  },
  IN_PROGRESS: {
    light: { backgroundColor: "#fffbeb", color: "#b45309" },
    dark:  { backgroundColor: "#451a03", color: "#fcd34d" },
  },
  READY: {
    light: { backgroundColor: "#ecfdf5", color: "#047857" },
    dark:  { backgroundColor: "#052e16", color: "#6ee7b7" },
  },
  IMPORTANT: {
    light: { backgroundColor: "#fef2f2", color: "#b91c1c" },
    dark:  { backgroundColor: "#450a0a", color: "#fca5a5" },
  },
};

const statusLabels: Record<OrderStatus, string> = {
  NEW: "Новый",
  IN_PROGRESS: "В процессе",
  READY: "Готов",
  IMPORTANT: "Важный",
};

const statusOptionValues: OrderStatus[] = ["NEW", "IN_PROGRESS", "READY", "IMPORTANT"];

const selectColors: Record<OrderStatus, string> = {
  NEW: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-950 dark:border-blue-800",
  IN_PROGRESS:
    "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950 dark:border-amber-800",
  READY:
    "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950 dark:border-emerald-800",
  IMPORTANT:
    "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-950 dark:border-red-800",
};

export function ProductStatusSelect({
  productId,
  status,
}: {
  productId: string;
  status: OrderStatus;
}) {
  const [current, setCurrent] = useState<OrderStatus>(status);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Sync with external changes (e.g. query refetch from another page)
  useEffect(() => {
    setCurrent(status);
  }, [status]);
  const isDark = mounted && resolvedTheme === "dark";

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (newStatus: OrderStatus) => patchProductStatus(productId, newStatus),
    onMutate: (newStatus) => {
      setCurrent(newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      setCurrent(status);
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    mutate(e.target.value as OrderStatus);
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      disabled={isPending}
      onClick={(e) => e.stopPropagation()}
      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium border cursor-pointer appearance-none text-center transition-opacity disabled:opacity-50 ${selectColors[current]}`}
    >
      {statusOptionValues.map((value) => (
        <option
          key={value}
          value={value}
          style={isDark ? statusOptionStyles[value].dark : statusOptionStyles[value].light}
        >
          {statusLabels[value]}
        </option>
      ))}
    </select>
  );
}
