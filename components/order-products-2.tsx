import { CheckCircle2, XCircle } from "lucide-react";
import type { FC } from "react";
import { ProductStatusSelect } from "@/components/product-status-select";
import { ProductThumb } from "@/components/product-thumb";
import { StatusBadge } from "@/components/status-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/data";

type OrderProductsProps = {
  products: Product[];
  isAdmin: boolean;
};

export const OrderProducts2: FC<OrderProductsProps> = ({
  products,
  isAdmin,
}) => {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={products.map((p) => p.id)}
    >
      {products.map((product) => (
        <AccordionItem key={product.id} value={product.id}>
          <AccordionTrigger>
            <div className="flex items-center gap-4 p-4">
              <ProductThumb color={product.imageColor} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-tight">
                  {product.name}
                </p>
              </div>
              {isAdmin ? (
                <ProductStatusSelect
                  productId={product.id}
                  status={product.status}
                />
              ) : (
                <StatusBadge status={product.status} />
              )}
            </div>
          </AccordionTrigger>

          <AccordionContent asChild defaultValue="open">
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Параметры
              </p>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(product.params).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium text-right">
                      {typeof value === "boolean" ? (
                        value ? (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 size={14} />
                            Да
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <XCircle size={14} />
                            Нет
                          </span>
                        )
                      ) : (
                        String(value)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
