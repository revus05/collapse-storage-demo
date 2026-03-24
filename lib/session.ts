import { cookies } from "next/headers"
import { verifyToken, COOKIE_NAME } from "./auth"
import type { AuthUser } from "@/store/authSlice"

export async function getSession(): Promise<AuthUser | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  }
}
