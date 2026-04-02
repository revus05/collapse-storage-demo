import type { Order, OrderStatus } from "@/lib/data";

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export function fetchOrders(
  search = "",
  status: OrderStatus | null = null,
): Promise<Order[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  return apiFetch(`/api/orders?${params}`);
}

export function fetchOrder(id: string): Promise<Order> {
  return apiFetch(`/api/orders/${id}`);
}

export function patchProductStatus(
  productId: string,
  status: OrderStatus,
): Promise<void> {
  return apiFetch(`/api/products/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

export function patchProductComment(
  productId: string,
  field: "userComment" | "productionComment",
  value: string,
): Promise<void> {
  return apiFetch(`/api/products/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  });
}
