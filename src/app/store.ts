import { configureStore } from '@reduxjs/toolkit'
import { datasetSlice } from '../features/datasetSlice'
import { isFocusedSlice } from '../features/isFocusedSlice'
import { isIndicatorsModalShowingSlice } from '../features/isIndicatorsModalShowingSlice'
import { searchInputSlice } from '../features/searchInputSlice'
import { assetDataApi } from '../services/assetDataApi'
import { dbAssetsTrackerApi } from '../services/dbAssetsTrackerApi'
import { searchAssetsApi } from '../services/searchAssetsApi'


export const store = configureStore({
   reducer: {
      searchInput: searchInputSlice.reducer,
      dataset: datasetSlice.reducer,
      isFocused: isFocusedSlice.reducer,
      isIndicatorsModalShowing: isIndicatorsModalShowingSlice.reducer,
      [searchAssetsApi.reducerPath]: searchAssetsApi.reducer,
      [assetDataApi.reducerPath]: assetDataApi.reducer,
      [dbAssetsTrackerApi.reducerPath]: dbAssetsTrackerApi.reducer,

   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchAssetsApi.middleware).concat(assetDataApi.middleware).concat(dbAssetsTrackerApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


