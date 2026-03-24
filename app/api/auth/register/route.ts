import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth"
import { createUserSchema } from "@/lib/validators"

export async function POST(req: Request) {
  const body = await req.json()

  const parsed = createUserSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 },
    )
  }

  const { name, email, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: "Этот email уже зарегистрирован" },
      { status: 409 },
    )
  }

  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  })

  const token = await signToken({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })

  const res = NextResponse.json({ ok: true }, { status: 201 })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  })
  return res
}
