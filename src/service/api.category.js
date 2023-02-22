import { baseApi } from ".";
import toast from "react-hot-toast";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCategories: build.query({
      query: () => "categories",
      providesTags: ["Category"],
    }),
    getCategory: build.query({
      query: (id) => `categories/${id}`,
      providesTags: ["Category"],
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Category"],
      transformResponse: (response, meta, arg) => {
        toast.success("Category created!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    updateCategory: build.mutation({
      query: (data) => ({
        url: `categories/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
      transformResponse: (response, meta, arg) => {
        toast.success("Category updated!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
      transformResponse: (response, meta, arg) => {
        toast.success("Category has been deleted...");
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
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
