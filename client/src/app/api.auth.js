import { api } from "./api";
import { setAlert } from "./slice.global";
import { clearUser } from "./slice.user";

export const authApi = api
  .enhanceEndpoints({
    addTagTypes: ["User"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getUser: build.query({
        query: () => "account",
        providesTags: ["User"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
          } catch (err) {
            dispatch(clearUser());
          }
        },
      }),
      createUser: build.mutation({
        query: (body) => ({
          url: "account/register",
          method: "POST",
          body,
        }),
        invalidatesTags: ["User", "Jobs", "Stats"],
      }),
      updateUser: build.mutation({
        query: (body) => ({
          url: "account",
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["User"],
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
            dispatch(
              setAlert({
                type: "success",
                msg: "Profile updated!",
              })
            );
          } catch (err) {}
        },
      }),
      login: build.mutation({
        query: (body) => ({
          url: "account/login",
          method: "POST",
          body,
        }),
        invalidatesTags: ["User", "Jobs", "Stats"],
      }),
      logout: build.mutation({
        query: () => ({
          url: "account",
          method: "DELETE",
        }),
        async onQueryStarted(_, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
          } catch (err) {
            dispatch(clearUser());
          }
        },
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetUserQuery,
  useLoginMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLogoutMutation,
} = authApi;
