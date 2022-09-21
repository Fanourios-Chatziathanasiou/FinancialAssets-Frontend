// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { assetDataType, searchAssetsType } from '../types/typesCollection'

// Define a service using a base URL and expected endpoints

export const assetDataApi = createApi({
  reducerPath: 'assetData',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_ASSETDATA_API_ENDPOINT}` }),
  endpoints: (builder) => ({

    getAssetDataByName: builder.query<assetDataType, string>({
      query: (name) => `/symbol=${name}&interval=1day`,
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
export const { useGetAssetDataByNameQuery } = assetDataApi;