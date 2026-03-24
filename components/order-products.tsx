"use client";

import type { FC } from "react";
import { OrderProducts1 } from "@/components/order-products-1";
import { OrderProducts2 } from "@/components/order-products-2";
import { OrderProducts3 } from "@/components/order-products-3";
import type { Product } from "@/lib/data";
import { useAppSelector } from "@/store/hooks";

type OrderProductsProps = {
  products: Product[];
  isAdmin: boolean;
};

export const OrderProducts: FC<OrderProductsProps> = ({
  products,
  isAdmin,
}) => {
  const variant = useAppSelector((state) => state.variant.variant);

  if (variant === 1) {
    return <OrderProducts1 products={products} isAdmin={isAdmin} />;
  }

  if (variant === 2) {
    return <OrderProducts2 products={products} isAdmin={isAdmin} />;
  }

  if (variant === 3) {
    return <OrderProducts3 products={products} isAdmin={isAdmin} />;
  }
};
