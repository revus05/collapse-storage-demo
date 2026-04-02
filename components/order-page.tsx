"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { AssemblyCheckbox } from "@/components/assembly-checkbox";
import { ProductComment } from "@/components/product-comment";
import { ProductStatusSelect } from "@/components/product-status-select";
import { ProductThumb } from "@/components/product-thumb";
import { fetchOrders } from "@/lib/api";
import type { OrderStatus } from "@/lib/data";

type OrderPageProps = {
  search: string;
  statusFilter: OrderStatus | null;
};

// checkbox | order id | product | status | comment
const COLS = "grid-cols-[80px_1fr_120px_1fr_36px]";
const HEADERS = [
  "Заказ",
  "Товар",
  "Статус",
  "Комментарий производства",
  "",
] as const;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
}

export const OrderPage: FC<OrderPageProps> = ({ search, statusFilter }) => {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", { search, status: statusFilter }],
    queryFn: () => fetchOrders(search, statusFilter),
  });

  /* ── Skeleton ──────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <>
        <div className="sm:hidden flex flex-col gap-3">
          {["sk1", "sk2", "sk3"].map((k) => (
            <div
              key={k}
              className="rounded-xl border border-border bg-card overflow-hidden animate-pulse"
            >
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-12 bg-muted rounded" />
              </div>
              <div className="px-4 py-3 flex items-center gap-3">
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="w-8 h-8 bg-muted rounded-lg shrink-0" />
                <div className="flex-1 h-4 bg-muted rounded" />
                <div className="h-6 w-20 bg-muted rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block rounded-xl border border-border bg-card overflow-hidden">
          <div
            className={`grid ${COLS} gap-x-5 bg-muted/50 border-b border-border px-5 py-2.5`}
          >
            {HEADERS.map((h) => (
              <span
                key={h}
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="divide-y divide-border">
            {["sk1", "sk2", "sk3"].map((k) => (
              <div
                key={k}
                className={`grid ${COLS} gap-x-5 items-center px-5 py-3 animate-pulse`}
              >
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 w-12 bg-muted rounded" />
                  <div className="h-3 w-8 bg-muted rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-lg shrink-0" />
                  <div className="h-4 flex-1 bg-muted rounded" />
                </div>
                <div className="h-6 w-20 bg-muted rounded-full" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
        Не удалось загрузить заказы
      </div>
    );
  }

  const empty = (
    <p className="px-4 py-8 text-center text-sm text-muted-foreground">
      Заказы не найдены
    </p>
  );

  return (
    <>
      {/* ── Mobile ───────────────────────────────────────────────────── */}
      <div className="sm:hidden flex flex-col gap-3">
        {orders.length === 0 && empty}
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <Link
              href={`/orders/${order.id}`}
              className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border hover:bg-muted/70 transition-colors"
            >
              <span className="font-semibold text-sm">Заказ #{order.id}</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-xs">
                  {order.products.length}{" "}
                  {order.products.length === 1
                    ? "товар"
                    : order.products.length < 5
                      ? "товара"
                      : "товаров"}
                </span>
                <ChevronRight size={14} />
              </div>
            </Link>

            <div className="divide-y divide-border">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="px-4 py-3 flex flex-col gap-2.5"
                >
                  <div className="flex items-center gap-3">
                    <AssemblyCheckbox product={product} />
                    <ProductThumb imageUrl={product.imageUrl} size="sm" />
                    <span className="flex-1 text-sm font-medium truncate min-w-0">
                      {product.name}
                    </span>
                    <ProductStatusSelect
                      productId={product.id}
                      status={product.status}
                    />
                  </div>
                  <ProductComment
                    productId={product.id}
                    field="productionComment"
                    initialValue={product.productionComment ?? ""}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop ──────────────────────────────────────────────────── */}
      <div className="hidden sm:block rounded-xl border border-border bg-card overflow-hidden">
        <div
          className={`grid ${COLS} gap-x-5 bg-muted/50 border-b border-border px-5 py-2.5`}
        >
          {HEADERS.map((h) => (
            <span
              key={h}
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="divide-y divide-border">
          {orders.length === 0 && empty}
          {orders.map((order) => (
            <div
              key={order.id}
              className="group hover:bg-accent/30 transition-colors"
            >
              {order.products.map((product, idx) => (
                <div
                  key={product.id}
                  className={`grid ${COLS} gap-x-5 items-center px-5 py-2.5${idx > 0 ? " border-t border-border/40" : ""}`}
                >
                  {/* Order ID + date — first row only */}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    {idx === 0 && (
                      <>
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-mono font-bold text-sm truncate"
                        >
                          #{order.id}
                        </Link>
                        <span className="text-xs text-muted-foreground">
                          {fmtDate(order.createdAt)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Product */}
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex items-center gap-3 min-w-0 group/row"
                  >
                    <ProductThumb imageUrl={product.imageUrl} size="sm" />
                    <span className="text-sm font-medium truncate min-w-0">
                      {product.name}
                    </span>
                  </Link>

                  {/* Status */}
                  <div>
                    <ProductStatusSelect
                      productId={product.id}
                      status={product.status}
                    />
                  </div>

                  {/* Comment */}
                  <div className="min-w-0 relative">
                    <ProductComment
                      productId={product.id}
                      field="productionComment"
                      initialValue={product.productionComment ?? ""}
                      rows={2}
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center justify-center">
                    <AssemblyCheckbox product={product} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
