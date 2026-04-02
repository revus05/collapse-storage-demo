import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AssemblyState {
  selectedIds: string[]
  modelKey: string | null
}

const STORAGE_KEY = "assembly"

export function loadAssemblyState(): AssemblyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { selectedIds: [], modelKey: null }
    return JSON.parse(raw) as AssemblyState
  } catch {
    return { selectedIds: [], modelKey: null }
  }
}

export function saveAssemblyState(state: AssemblyState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore write errors (e.g. private mode quota)
  }
}

const initialState: AssemblyState = { selectedIds: [], modelKey: null }

export const assemblySlice = createSlice({
  name: "assembly",
  initialState,
  reducers: {
    rehydrate(_state, action: PayloadAction<AssemblyState>) {
      return action.payload
    },
    toggleProduct(state, action: PayloadAction<{ id: string; modelKey: string }>) {
      const { id, modelKey } = action.payload
      const idx = state.selectedIds.indexOf(id)
      if (idx >= 0) {
        state.selectedIds.splice(idx, 1)
        if (state.selectedIds.length === 0) state.modelKey = null
      } else {
        state.selectedIds.push(id)
        if (!state.modelKey) state.modelKey = modelKey
      }
    },
    clearAssembly(state) {
      state.selectedIds = []
      state.modelKey = null
    },
  },
})

export const { rehydrate, toggleProduct, clearAssembly } = assemblySlice.actions
export default assemblySlice.reducer
