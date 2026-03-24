"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { OrderPage } from "@/components/order-page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { orders } from "@/lib/data";

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="flex justify-between sm:flex-row flex-col gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Заказы</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {orders.length} заказа
            </p>
          </div>

          <InputGroup className="sm:w-[200px]">
            <InputGroupInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск"
            />
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <OrderPage search={search} />
      </div>
    </div>
  );
}
