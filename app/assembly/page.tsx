"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { ProductStatusSelect } from "@/components/product-status-select";
import { ProductThumb } from "@/components/product-thumb";
import { fetchOrders } from "@/lib/api";
import type { ProductParams } from "@/lib/data";
import { clearAssembly } from "@/store/assemblySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AssemblyPage() {
  const dispatch = useAppDispatch();
  const { selectedIds, modelKey } = useAppSelector((s) => s.assembly);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", { search: "", status: null }],
    queryFn: () => fetchOrders(),
    enabled: selectedIds.length > 0,
  });

  const products = orders
    .flatMap((o) => o.products)
    .filter((p) => selectedIds.includes(p.id))
    .sort((a, b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id));

  // Collect ordered unique param keys (preserve first-seen order)
  const paramKeys = [
    ...new Map(
      products.flatMap((p) =>
        Object.keys(p.params as ProductParams).map((k) => [k, k]),
      ),
    ).keys(),
  ];

  /* ── Empty state ─────────────────────────────────────────────── */
  if (selectedIds.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            Все заказы
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight mb-8">
            Комплектация
          </h1>
          <div className="rounded-xl border border-border bg-card px-6 py-14 text-center">
            <p className="text-sm font-medium text-foreground">
              Нет выбранных товаров
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Отметьте товары галочкой в{" "}
              <Link
                href="/"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                таблице заказов
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 max-w-360 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mb-4"
          >
            <ArrowLeft size={14} />
            Все заказы
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Комплектация
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {modelKey && (
                  <>
                    Модель:{" "}
                    <span className="font-medium text-foreground">
                      {modelKey}
                    </span>
                    {" · "}
                  </>
                )}
                {selectedIds.length}{" "}
                {selectedIds.length === 1
                  ? "товар"
                  : selectedIds.length < 5
                    ? "товара"
                    : "товаров"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(clearAssembly())}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-destructive/40 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 size={14} />
              Очистить
            </button>
          </div>
        </div>

        {/* ── Mobile blocks ─────────────────────────────────── */}
        {isLoading ? (
          <div className="sm:hidden rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground animate-pulse">
            Загрузка...
          </div>
        ) : (
          <div className="sm:hidden flex flex-col gap-3 text-sm">
            {/* Status block */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Статус
              </div>
              <div className="divide-y divide-border">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-2.5"
                  >
                    <Link
                      href={`/orders/${product.orderId}`}
                      className="flex items-center gap-2 min-w-0 flex-1"
                    >
                      <ProductThumb imageUrl={product.imageUrl} size="sm" />
                      <span className="text-xs font-medium text-muted-foreground truncate">
                        {product.name}
                      </span>
                    </Link>
                    <ProductStatusSelect
                      productId={product.id}
                      status={product.status}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Param blocks */}
            {paramKeys.map((key) => (
              <div
                key={key}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <div className="px-4 py-2.5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {key}
                </div>
                <div className="divide-y divide-border">
                  {products.map((product) => {
                    const val = (product.params as ProductParams)[key];
                    return (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 px-4 py-2.5"
                      >
                        <Link
                          href={`/orders/${product.orderId}`}
                          className="flex items-center gap-2 min-w-0 flex-1"
                        >
                          <ProductThumb imageUrl={product.imageUrl} size="sm" />
                          <span className="text-xs font-medium text-muted-foreground truncate">
                            {product.name}
                          </span>
                        </Link>
                        <div className="shrink-0 text-sm text-foreground">
                          {val === undefined || val === null ? (
                            <span className="text-muted-foreground/40">—</span>
                          ) : typeof val === "boolean" ? (
                            val ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 size={13} />
                                Да
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-muted-foreground">
                                <XCircle size={13} />
                                Нет
                              </span>
                            )
                          ) : (
                            String(val)
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Desktop table ──────────────────────────────────── */}
        {isLoading ? (
          <div className="hidden sm:block rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground animate-pulse">
            Загрузка...
          </div>
        ) : (
          <div className="hidden sm:flex rounded-xl border border-border bg-card overflow-hidden text-sm">
            {/* ── Left fixed column ─────────────────────────── */}
            <div className="shrink-0 w-fit border-r border-border flex flex-col divide-y divide-border">
              {/* Header cell */}
              <div className="h-13 flex items-center px-5 bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Характеристика
              </div>
              {/* Status cell */}
              <div className="h-14 flex items-center px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Статус
              </div>
              {/* Param cells */}
              {paramKeys.map((key) => (
                <div
                  key={key}
                  className="h-14 flex items-center px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                >
                  {key}
                </div>
              ))}
            </div>

            {/* ── Right scrollable columns ──────────────────── */}
            <div className="overflow-x-auto flex-1">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${products.length}, 1fr)`,
                }}
              >
                {/* Header row */}
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="h-13 flex items-center px-5 bg-muted/50 border-b border-border"
                  >
                    <Link
                      href={`/orders/${product.orderId}`}
                      className="flex items-center gap-2.5 group"
                    >
                      <ProductThumb imageUrl={product.imageUrl} size="sm" />
                      <span className="font-medium whitespace-nowrap text-xs text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
                        {product.name}
                      </span>
                    </Link>
                  </div>
                ))}

                {/* Status row */}
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="h-14 flex items-center px-5 border-b border-border"
                  >
                    <ProductStatusSelect
                      productId={product.id}
                      status={product.status}
                    />
                  </div>
                ))}

                {/* Param rows */}
                {paramKeys.map((key) =>
                  products.map((product) => {
                    const val = (product.params as ProductParams)[key];
                    return (
                      <div
                        key={`${key}-${product.id}`}
                        className="h-14 flex items-center px-5 border-b border-border whitespace-nowrap text-foreground"
                      >
                        {val === undefined || val === null ? (
                          <span className="text-muted-foreground/40">—</span>
                        ) : typeof val === "boolean" ? (
                          val ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 size={13} />
                              Да
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <XCircle size={13} />
                              Нет
                            </span>
                          )
                        ) : (
                          String(val)
                        )}
                      </div>
                    );
                  }),
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
