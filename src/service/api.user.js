import { baseApi } from ".";
import toast from "react-hot-toast";
import { setCredentials, setUserInfo } from "../redux/user.slice";
import { useDispatch } from "react-redux";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    addUser: build.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response, meta, arg) => {
        toast.success("User created!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
    }),
    login: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),
    verify: build.mutation({
      query: () => ({
        url: "users/validatetoken",
        method: "POST",
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `users/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      transformResponse: (response, meta, arg) => {
        toast.success("User has been deleted...");
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
  useGetAllUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
  useVerifyMutation,
  endpoints,
} = userApi;
