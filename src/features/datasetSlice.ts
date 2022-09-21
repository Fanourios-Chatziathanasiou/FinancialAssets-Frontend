import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { assetDataType } from '../types/typesCollection'


// Define the initial state using that type
const initialState: assetDataType = {};

export const datasetSlice = createSlice({
  name: 'dataset',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateDataset: (state, action: PayloadAction<assetDataType>) => {
      //using object assign to provide the new form of the object
      Object.assign(state, action.payload);
    },
  },
})

export const { updateDataset } = datasetSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectDataset = (state: RootState) => state.assetData

export default datasetSlice.reducer;