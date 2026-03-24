"use client";

import type { FC } from "react";
import { OrderPage1 } from "@/components/order-page-1";
import { OrderPage2 } from "@/components/order-page-2";
import { useAppSelector } from "@/store/hooks";

type OrderPageProps = {
  search: string;
};

export const OrderPage: FC<OrderPageProps> = ({ search }) => {
  const variant = useAppSelector((state) => state.variant.variant);

  if (variant === 1) {
    return <OrderPage1 search={search} />;
  }

  return <OrderPage2 search={search} />;
};
