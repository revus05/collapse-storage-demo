import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderProducts } from "@/components/order-products";
import { getOrder } from "@/lib/data";
import { getSession } from "@/lib/session";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);
  const session = await getSession();
  const isAdmin = session?.role === "ADMIN";

  if (!order) notFound();

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
