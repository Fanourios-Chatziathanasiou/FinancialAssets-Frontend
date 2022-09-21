import { configureStore } from '@reduxjs/toolkit'
import {datasetSlice} from '../features/datasetSlice'
import {searchInputSlice} from '../features/searchInputSlice'
import { assetDataApi } from '../services/assetDataApi'
import { searchAssetsApi } from '../services/searchAssetsApi'


export const store = configureStore({
  reducer: {
     searchInput: searchInputSlice.reducer,
     dataset: datasetSlice.reducer,
     [searchAssetsApi.reducerPath]: searchAssetsApi.reducer,
     [assetDataApi.reducerPath]: assetDataApi.reducer

  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchAssetsApi.middleware).concat(assetDataApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


