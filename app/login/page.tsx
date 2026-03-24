"use client"

import { useForm } from "@tanstack/react-form"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validators"

function fieldError(errors: unknown[]): string | null {
  if (!errors.length) return null
  const e = errors[0]
  if (typeof e === "string") return e
  if (e && typeof e === "object" && "message" in e)
    return String((e as { message: string }).message)
  return null
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") ?? "/"
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      })
      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        const data = await res.json()
        setServerError(data.error ?? "Ошибка входа")
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            const r = loginSchema.shape.email.safeParse(value)
            return r.success ? undefined : r.error.issues[0].message
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor={field.name}>
              Email
            </label>
            <Input
              id={field.name}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {fieldError(field.state.meta.errors) && (
              <p className="text-xs text-destructive">
                {fieldError(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            const r = loginSchema.shape.password.safeParse(value)
            return r.success ? undefined : r.error.issues[0].message
          },
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor={field.name}>
              Пароль
            </label>
            <Input
              id={field.name}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {fieldError(field.state.meta.errors) && (
              <p className="text-xs text-destructive">
                {fieldError(field.state.meta.errors)}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {serverError && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Вход..." : "Войти"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Вход</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
