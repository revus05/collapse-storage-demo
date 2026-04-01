"use client"

import React, { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, type AppStore } from "./index"
import { setUser } from "./authSlice"
import type { AuthUser } from "./authSlice"

interface Props {
  user: AuthUser | null
  children: React.ReactNode
}

export function ReduxProvider({ user, children }: Props) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
    if (user) {
      storeRef.current.dispatch(setUser(user))
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
