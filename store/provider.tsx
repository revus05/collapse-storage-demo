"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import type { Persistor } from "redux-persist";
import type { AuthUser } from "./authSlice";
import { setUser } from "./authSlice";
import { type AppStore, makeStore } from "./index";

interface Props {
  user: AuthUser | null;
  children: React.ReactNode;
}

export function ReduxProvider({ user, children }: Props) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
    if (user) {
      storeRef.current.dispatch(setUser(user));
    }
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistorRef.current!}>
        {children}
      </PersistGate>
    </Provider>
  );
}
