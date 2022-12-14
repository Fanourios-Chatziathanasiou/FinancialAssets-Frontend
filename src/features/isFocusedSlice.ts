import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface isFocusedState {
  value: boolean
}

// Define the initial state using that type
const initialState: isFocusedState = {
  value: false,
}

export const isFocusedSlice = createSlice({
  name: 'isFocused',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateIsFocused: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const { updateIsFocused } = isFocusedSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsFocused = (state: RootState) => state.isFocused.value

export default isFocusedSlice.reducer