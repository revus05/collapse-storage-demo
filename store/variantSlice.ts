import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  variant: number;
};

const initialState: InitialState = {
  variant: 1,
};

export const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    setVariant(state, action: PayloadAction<number>) {
      state.variant = action.payload;
    },
  },
});

export const { setVariant } = variantSlice.actions;
export default variantSlice.reducer;
