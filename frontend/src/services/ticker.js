import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tickerApi = createApi({
  reducerPath: "tickerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/ticker/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
  }),
  contentTypes: ["application/json"],
  endpoints: (builder) => ({
    getByRange: builder.query({
      query: ({ stock, start, end }) => ({
        url: `${stock}`,
        params: { start, end },
      }),
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetByRangeQuery } = tickerApi;
