import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
    }),
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});
export const { useGetAllUsersQuery, useGetUserQuery } = userApi;
