import { baseApi } from ".";
import toast from "react-hot-toast";

const articleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllArticles: build.query({
      query: () => "articles",
      providesTags: ["Article"],
    }),
    getArticle: build.query({
      query: (id) => `articles/${id}`,
      providesTags: ["Article"],
    }),
    addArticle: build.mutation({
      query: (body) => ({
        url: "articles",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Article"],
      transformResponse: (response, meta, arg) => {
        toast.success("Article created!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    updateArticle: build.mutation({
      query: (data) => ({
        url: `articles/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Article"],
      transformResponse: (response, meta, arg) => {
        toast.success("Article updated!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    deleteArticle: build.mutation({
      query: (id) => ({
        url: `articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
      transformResponse: (response, meta, arg) => {
        toast.success("Article has been deleted...");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllArticlesQuery,
  useGetArticleQuery,
  useUpdateArticleMutation,
  useAddArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
