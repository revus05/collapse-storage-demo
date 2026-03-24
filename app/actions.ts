"use server"

import { getSession } from "@/lib/session"
import { orders, type OrderStatus } from "@/lib/data"
import { revalidatePath } from "next/cache"

export async function updateProductStatus(productId: string, status: OrderStatus) {
  const session = await getSession()
  if (!session || session.role !== "ADMIN") {
    throw new Error("Forbidden")
  }

  for (const order of orders) {
    const product = order.products.find((p) => p.id === productId)
    if (product) {
      product.status = status
      revalidatePath(`/orders/${order.id}`)
      revalidatePath("/")
      return
    }
  }

  throw new Error("Product not found")
}
