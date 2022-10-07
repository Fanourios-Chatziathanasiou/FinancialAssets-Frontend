// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { assetDataType, searchAssetsType } from '../types/typesCollection'

// Define a service using a base URL and expected endpoints

export const dbAssetsTrackerApi = createApi({
  reducerPath: 'DbAssetsTracker',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_DBASSETSTRACKER_API_ENDPOINT}` }),
  endpoints: (builder) => ({

    getDbAssetsTracker: builder.query<any, string>({
      query: (name) => ``,
      // transformResponse: (response:assetDataType):assetDataType => {
      //   response.values.forEach((element,index,arr)=>{
      //     arr[index].datetime = new Date(arr[index].datetime)
      //   })
      //   return response;
      // }
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDbAssetsTrackerQuery } = dbAssetsTrackerApi;