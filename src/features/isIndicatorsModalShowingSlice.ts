import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'


// Define a type for the slice state
interface isIndicatorsModalShowingState {
  value: boolean
}

// Define the initial state using that type
const initialState: isIndicatorsModalShowingState = {
  value: false,
}

export const isIndicatorsModalShowingSlice = createSlice({
  name: 'isIndicatorsModalShowing',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateisIndicatorsModalShowing: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const { updateisIndicatorsModalShowing } = isIndicatorsModalShowingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsIndicatorsModalShowing = (state: RootState) => state.isIndicatorsModalShowing.value

export default isIndicatorsModalShowingSlice.reducer