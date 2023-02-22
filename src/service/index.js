import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      console.log(token);

      if (token) {
        headers.set("token", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Category", "Article"],
  endpoints: () => ({}),
});
