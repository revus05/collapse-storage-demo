import { configureStore } from "@reduxjs/toolkit";
import type { AuthState } from "./authSlice";
import authReducer from "./authSlice";
import assemblyReducer, { saveAssemblyState } from "./assemblySlice";

interface PreloadedState {
  auth: { user: AuthState["user"] };
}

const assemblyPersistMiddleware =
  (store: { getState: () => { assembly: Parameters<typeof saveAssemblyState>[0] } }) =>
  (next: (action: unknown) => unknown) =>
  (action: unknown) => {
    const result = next(action)
    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof (action as { type: unknown }).type === "string" &&
      (action as { type: string }).type.startsWith("assembly/") &&
      (action as { type: string }).type !== "assembly/rehydrate"
    ) {
      saveAssemblyState(store.getState().assembly)
    }
    return result
  }

export function makeStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: {
      auth: authReducer,
      assembly: assemblyReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        assemblyPersistMiddleware,
      ),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
