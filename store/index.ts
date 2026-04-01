import { configureStore } from "@reduxjs/toolkit";
import type { AuthState } from "./authSlice";
import authReducer from "./authSlice";

interface PreloadedState {
  auth: { user: AuthState["user"] };
}

export function makeStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
