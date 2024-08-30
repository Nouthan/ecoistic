import { apiSlice } from "../apiSlice.js";
const TASK_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGoal: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create/goal`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getGoalOfUser: builder.query({
      query: () => ({
        url: `${TASK_URL}/goal`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllTasks: builder.query({
      query: () => ({
        url: `${TASK_URL}/tasks`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllCommunities: builder.query({
      query: () => ({
        url: `${TASK_URL}/all-communities`,
        method: "GET",
        credentials: "include",
      }),
    }),
    addUserToCommunity: builder.mutation({
      query: (communityId) => ({
        url: `${TASK_URL}/add-to-community`,
        method: "PUT",
        body: { communityId: communityId },
        credentials: "include",
      }),
    }),
    getGoalData : builder.query({
      query: () => ({
        url: `${TASK_URL}/goals`,
        method: "GET",
        credentials: "include",
      })
    }),
    updateItemStatus: builder.mutation({
      query: ({ itemId, itemType }) => ({
        url: `${TASK_URL}/update-task`,
        method: 'PUT',
        body: { itemId, itemType },
        credentials: 'include',
      }),
    }),
    getRewards : builder.query({
      query: () => ({
        url: `${TASK_URL}/all-rewards`,
        method: "GET",
        credentials: "include",
      })
    }),
  }),
});

export const {
  useCreateGoalMutation,
  useGetGoalOfUserQuery,
  useGetAllTasksQuery,
  useGetAllCommunitiesQuery,
  useAddUserToCommunityMutation,
  useGetGoalDataQuery,
  useUpdateItemStatusMutation,
  useGetRewardsQuery
} = taskApiSlice;
