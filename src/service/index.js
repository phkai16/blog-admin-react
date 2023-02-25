import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/globalVariable";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    withCredentials: true,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      console.log("index", token);

      if (token) {
        headers.set("token", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Category", "Article"],
  endpoints: () => ({}),
});
