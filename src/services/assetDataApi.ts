// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { searchAssetsType } from '../types/typesCollection'

// Define a service using a base URL and expected endpoints

export const assetDataApi = createApi({
  reducerPath: 'assetData',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_ASSETDATA_API_ENDPOINT}` }),
  endpoints: (builder) => ({
    
    getAssetDataByName: builder.query<searchAssetsType[], string>({
      query: (name)=>`/symbol=${name}&interval=1day`
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAssetDataByNameQuery } = assetDataApi;