import { apiSlice } from "../apiSlice";
const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/all-users`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});
export const { useGetAllUsersQuery } = userApiSlice;
