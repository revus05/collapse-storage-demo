export type OrderStatus = "NEW" | "IN_PROGRESS" | "READY" | "IMPORTANT"

export interface ProductParams {
  [key: string]: string | boolean | number
}

export interface Product {
  id: string
  name: string
  imageUrl: string
  status: OrderStatus
  params: ProductParams
  userComment?: string | null
  productionComment?: string | null
  orderId: string
}

export interface Order {
  id: string
  createdAt: string
  products: Product[]
}
