import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface searchInputState {
  value: string
}

// Define the initial state using that type
const initialState: searchInputState = {
  value: "",
}

export const searchInputSlice = createSlice({
  name: 'searchInput',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateInput: (state, action: PayloadAction<string>) => {
      state.value = String(action.payload)
    },
  },
})

export const { updateInput } = searchInputSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectInput = (state: RootState) => state.searchInput.value

export default searchInputSlice.reducer