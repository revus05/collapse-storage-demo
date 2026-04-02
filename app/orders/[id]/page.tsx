"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderProducts } from "@/components/order-products";
import { fetchOrder } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => fetchOrder(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="mb-8 animate-pulse space-y-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-7 w-40 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
          <div className="space-y-4">
            {["s1", "s2"].map((k) => (
              <div key={k} className="rounded-xl border border-border bg-card p-4 animate-pulse space-y-3">
                <div className="h-14 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !order) return notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            Все заказы
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Заказ #{order.id}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {new Date(order.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" · "}
            {order.products.length}{" "}
            {order.products.length === 1
              ? "товар"
              : order.products.length < 5
                ? "товара"
                : "товаров"}
          </p>
        </div>
        <OrderProducts products={order.products} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
