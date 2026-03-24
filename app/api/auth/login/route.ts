import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth"
import { loginSchema } from "@/lib/validators"

export async function POST(req: Request) {
  const body = await req.json()

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    )
  }

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json(
      { error: "Неверный email или пароль" },
      { status: 401 },
    )
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json(
      { error: "Неверный email или пароль" },
      { status: 401 },
    )
  }

  const token = await signToken({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  })
  return res
}
