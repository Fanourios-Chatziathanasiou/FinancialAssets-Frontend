// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { searchAssetsType } from '../types/typesCollection'

// Define a service using a base URL and expected endpoints

export const searchAssetsApi = createApi({
  reducerPath: 'searchAssetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_SEARCHASSETS_API_ENDPOINT}` }),
  endpoints: (builder) => ({
    
    getSearchAssetsByName: builder.query<searchAssetsType[], string>({
      query: (name)=>`${name}`
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSearchAssetsByNameQuery } = searchAssetsApi