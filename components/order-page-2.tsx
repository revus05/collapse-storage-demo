import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { ProductThumb } from "@/components/product-thumb";
import { StatusBadge } from "@/components/status-badge";
import { orders } from "@/lib/data";

type OrderPage1Props = {
  search: string;
};

export const OrderPage2: FC<OrderPage1Props> = ({ search }) => {
  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(search) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div className="flex flex-col gap-3">
      {filteredOrders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}`}
          className="group block rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-muted-foreground" />
                <span className="font-semibold text-sm">Заказ #{order.id}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <ChevronRight
                size={16}
                className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
              />
            </div>

            <div className="flex flex-col gap-2">
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <ProductThumb color={product.imageColor} size="sm" />
                  <span className="text-sm flex-1 min-w-0 truncate">
                    {product.name}
                  </span>
                  <StatusBadge status={product.status} />
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
