import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "categories",
    }),
    getCategory: builder.query({
      query: (id) => `categories/${id}`,
    }),
  }),
});
export const { useLazyGetAllCategoriesQuery, useGetCategoryQuery } =
  categoryApi;
