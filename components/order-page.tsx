"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/lib/api";
import { ProductComment } from "@/components/product-comment";
import { ProductStatusSelect } from "@/components/product-status-select";
import { ProductThumb } from "@/components/product-thumb";
import type { OrderStatus } from "@/lib/data";

type OrderPageProps = {
  search: string;
  statusFilter: OrderStatus | null;
};

const COLS = "grid-cols-[minmax(0,1fr)_160px_minmax(0,2fr)_minmax(0,1.5fr)]";

export const OrderPage: FC<OrderPageProps> = ({ search, statusFilter }) => {
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["orders", { search, status: statusFilter }],
    queryFn: () => fetchOrders(search, statusFilter),
  });

  /* ── Skeleton ─────────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <>
        {/* Mobile skeleton */}
        <div className="sm:hidden flex flex-col gap-3">
          {["sk1", "sk2", "sk3"].map((k) => (
            <div key={k} className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 w-12 bg-muted rounded" />
              </div>
              <div className="px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg shrink-0" />
                <div className="flex-1 h-4 bg-muted rounded" />
                <div className="h-6 w-20 bg-muted rounded-full" />
              </div>
            </div>
          ))}
        </div>
        {/* Desktop skeleton */}
        <div className="hidden sm:block rounded-xl border border-border bg-card">
          <div className={`grid ${COLS} gap-x-4 bg-muted/50 border-b border-border px-4 py-2`}>
            {["ID заказа", "Статус", "Товары в заказе", "Комментарий производства"].map((h) => (
              <span key={h} className="text-sm font-medium text-muted-foreground">{h}</span>
            ))}
          </div>
          <div className="divide-y divide-border">
            {["sk1", "sk2", "sk3"].map((k) => (
              <div key={k} className="px-4 py-4 flex gap-4 animate-pulse">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-4 flex-1 bg-muted rounded" />
                <div className="h-4 w-32 bg-muted rounded" />
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
    <p className="px-4 py-8 text-center text-sm text-muted-foreground">Заказы не найдены</p>
  );

  return (
    <>
      {/* ── Mobile: card per order ──────────────────────────────────── */}
      <div className="sm:hidden flex flex-col gap-3">
        {orders.length === 0 && empty}
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Order header */}
            <Link
              href={`/orders/${order.id}`}
              className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border hover:bg-muted/70 transition-colors"
            >
              <span className="font-semibold text-sm">Заказ #{order.id}</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-xs">
                  {order.products.length}{" "}
                  {order.products.length === 1 ? "товар" : order.products.length < 5 ? "товара" : "товаров"}
                </span>
                <ChevronRight size={14} />
              </div>
            </Link>

            {/* Products */}
            <div className="divide-y divide-border">
              {order.products.map((product) => (
                <div key={product.id} className="px-4 py-3 flex flex-col gap-2.5">
                  {/* Product row: thumb + name + status */}
                  <div className="flex items-center gap-3">
                    <ProductThumb imageUrl={product.imageUrl} size="sm" />
                    <span className="flex-1 text-sm font-medium truncate min-w-0">
                      {product.name}
                    </span>
                    <ProductStatusSelect productId={product.id} status={product.status} />
                  </div>

                  {/* Comment */}
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

      {/* ── Desktop: grid table ─────────────────────────────────────── */}
      <div className="hidden sm:block rounded-xl border border-border bg-card overflow-hidden">
        <div className={`grid ${COLS} gap-x-4 bg-muted/50 border-b border-border px-4 py-2`}>
          <span className="text-sm font-medium text-muted-foreground">ID заказа</span>
          <span className="text-sm font-medium text-muted-foreground">Статус</span>
          <span className="text-sm font-medium text-muted-foreground">Товары в заказе</span>
          <span className="text-sm font-medium text-muted-foreground">Комментарий производства</span>
        </div>

        <div className="divide-y divide-border">
          {orders.length === 0 && empty}
          {orders.map((order) => (
            <div key={order.id} className="hover:bg-accent/50 transition-colors">
              <div className="flex flex-col">
                {order.products.map((product, idx) => (
                  <div
                    key={product.id}
                    className={`grid ${COLS} gap-x-4 items-center px-4 py-2.5`}
                  >
                    {/* Order ID — first row only */}
                    <div className="flex items-center min-w-0">
                      {idx === 0 && (
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-semibold text-sm hover:underline truncate"
                        >
                          #{order.id}
                        </Link>
                      )}
                    </div>

                    <div className="flex items-center">
                      <ProductStatusSelect productId={product.id} status={product.status} />
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="flex items-center gap-3 min-w-0"
                    >
                      <ProductThumb imageUrl={product.imageUrl} size="sm" />
                      <span className="text-sm truncate min-w-0">{product.name}</span>
                    </Link>

                    <div className="min-w-0">
                      <ProductComment
                        productId={product.id}
                        field="productionComment"
                        initialValue={product.productionComment ?? ""}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
