import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import variantReducer from "@/store/variantSlice";
import type { AuthState } from "./authSlice";
import authReducer from "./authSlice";

interface PreloadedState {
  auth: { user: AuthState["user"] };
}

const variantPersistConfig = {
  key: "variant",
  storage,
};

const persistedVariantReducer = persistReducer(
  variantPersistConfig,
  variantReducer,
);

export function makeStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: { auth: authReducer, variant: persistedVariantReducer },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
