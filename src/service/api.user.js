import { baseApi } from ".";
import toast from "react-hot-toast";
import { setCredentials } from "../redux/user.slice";
// import { setCredentials } from "../redux/user.slice";

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
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          console.log(res.data.accessToken);
          dispatch(
            setCredentials({
              token: res.data.accessToken,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
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
      transformResponse: (response, meta, arg) => {
        toast.success("User updated!");
        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        toast.error("Something went wrong...");
        return response.status;
      },
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
} = userApi;
