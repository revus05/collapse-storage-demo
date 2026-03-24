import { SignJWT, jwtVerify } from "jose"

export interface JWTPayload {
  sub: string
  name: string
  email: string
  role: "USER" | "ADMIN"
}

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev-secret-please-change-in-production",
)

export const COOKIE_NAME = "auth_token"
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}
