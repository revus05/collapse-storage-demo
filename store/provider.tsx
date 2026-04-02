"use client"

import React, { useEffect, useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, type AppStore } from "./index"
import { setUser, clearUser } from "./authSlice"
import type { AuthUser } from "./authSlice"
import { loadAssemblyState, rehydrate } from "./assemblySlice"

interface Props {
  user: AuthUser | null
  children: React.ReactNode
}

export function ReduxProvider({ user, children }: Props) {
  const storeRef = useRef<AppStore | null>(null)
  // Capture localStorage value before the store (and its middleware) is created,
  // so that other dispatched actions cannot overwrite it first.
  const savedAssemblyRef = useRef(
    typeof window !== "undefined" ? loadAssemblyState() : null,
  )

  if (!storeRef.current) {
    storeRef.current = makeStore()
    if (user) {
      storeRef.current.dispatch(setUser(user))
    }
  }

  useEffect(() => {
    if (savedAssemblyRef.current) {
      storeRef.current!.dispatch(rehydrate(savedAssemblyRef.current))
    }
  }, [])

  useEffect(() => {
    if (user) {
      storeRef.current!.dispatch(setUser(user))
    } else {
      storeRef.current!.dispatch(clearUser())
    }
  }, [user])

  return <Provider store={storeRef.current}>{children}</Provider>
}
