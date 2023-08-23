import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from "../api/api";

export const searchapi = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({
        baseUrl: `${url}`,
    }),
    endpoints: (builder) => ({
        searchproducts: builder.query({
            query: (name) => `/products?name=${name}`,
        }),
    })
})

export const { useSearchproductsQuery } = searchapi
