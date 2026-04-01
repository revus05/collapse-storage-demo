export type OrderStatus = "NEW" | "IN_PROGRESS" | "READY" | "IMPORTANT"

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  NEW: {
    label: "Новый",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  IN_PROGRESS: {
    label: "В процессе",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  READY: {
    label: "Готов",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  IMPORTANT: {
    label: "Важный",
    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, className } = statusConfig[status]
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}
