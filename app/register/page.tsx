"use client"

import { useForm } from "@tanstack/react-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/lib/validators"

function fieldError(errors: unknown[]): string | null {
  if (!errors.length) return null
  const e = errors[0]
  if (typeof e === "string") return e
  if (e && typeof e === "object" && "message" in e)
    return String((e as { message: string }).message)
  return null
}

export default function RegisterPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    onSubmit: async ({ value }) => {
      setServerError(null)
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value.name,
          email: value.email,
          password: value.password,
        }),
      })
      if (res.ok) {
        router.push("/")
        router.refresh()
      } else {
        const data = await res.json()
        setServerError(data.error ?? "Ошибка регистрации")
      }
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Регистрация</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Войти
            </Link>
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="flex flex-col gap-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                const r = registerSchema.shape.name.safeParse(value)
                return r.success ? undefined : r.error.issues[0].message
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor={field.name}>
                  Имя
                </label>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="Иван Иванов"
                  autoComplete="name"
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
            name="email"
            validators={{
              onChange: ({ value }) => {
                const r = registerSchema.shape.email.safeParse(value)
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
                const r = registerSchema.shape.password.safeParse(value)
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
                  placeholder="Минимум 8 символов"
                  autoComplete="new-password"
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
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                if (!value) return "Подтвердите пароль"
                if (value !== fieldApi.form.getFieldValue("password"))
                  return "Пароли не совпадают"
                return undefined
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor={field.name}>
                  Подтвердите пароль
                </label>
                <Input
                  id={field.name}
                  type="password"
                  placeholder="Повторите пароль"
                  autoComplete="new-password"
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
                {isSubmitting ? "Создание аккаунта..." : "Зарегистрироваться"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  )
}
