import Link from "next/link";
import type { FC } from "react";
import { ProductThumb } from "@/components/product-thumb";
import { StatusBadge } from "@/components/status-badge";
import { orders } from "@/lib/data";

type OrderPage1Props = {
  search: string;
};

export const OrderPage1: FC<OrderPage1Props> = ({ search }) => {
  const filteredOrders = orders.filter(
    (order) =>
      order.id.includes(search) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
              ID заказа
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
              Товары в заказе
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-accent/50 transition-colors">
              <td className="px-6 py-4">
                <Link
                  href={`/orders/${order.id}`}
                  className="font-semibold text-sm hover:underline block"
                >
                  <span>#{order.id}</span>
                </Link>
              </td>

              {/* Столбец с товарами в заказе */}
              <td className="px-6 py-4">
                <Link
                  className="flex flex-col gap-2"
                  href={`/orders/${order.id}`}
                >
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <ProductThumb color={product.imageColor} size="sm" />
                      <span className="text-sm flex-1 min-w-0 truncate">
                        {product.name}
                      </span>
                      <StatusBadge status={product.status} />
                    </div>
                  ))}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
