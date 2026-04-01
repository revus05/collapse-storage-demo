import Link from "next/link";
import type { FC } from "react";
import { ProductStatusSelect } from "@/components/product-status-select";
import { ProductThumb } from "@/components/product-thumb";
import { type OrderStatus, orders } from "@/lib/data";

type OrderPageProps = {
  search: string;
  statusFilter: OrderStatus | null;
};

export const OrderPage: FC<OrderPageProps> = ({ search, statusFilter }) => {
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.includes(search) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === null ||
      order.products.some((p) => p.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr className="border-b border-border">
            <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
              ID заказа
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
              Статус
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
              Товары в заказе
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filteredOrders.map((order) => (
            <tr key={order.id} className="hover:bg-accent/50 transition-colors">
              <td className="px-4 py-2">
                <Link
                  href={`/orders/${order.id}`}
                  className="font-semibold text-sm hover:underline block"
                >
                  <span>#{order.id}</span>
                </Link>
              </td>

              <td className="px-4 py-2">
                <div className="flex flex-col gap-2">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <ProductStatusSelect
                        productId={product.id}
                        status={product.status}
                      />
                    </div>
                  ))}
                </div>
              </td>

              <td className="px-4 py-2">
                <div className="flex flex-col gap-2">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="flex items-center gap-3 flex-1 min-w-0"
                      >
                        <ProductThumb imageUrl={product.imageUrl} size="sm" />
                        <span className="text-sm flex-1 min-w-0 truncate">
                          {product.name}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
