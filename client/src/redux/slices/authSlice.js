import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  communityIds: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).communityIds || []
    : [],
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    updateUserCommunityIds: (state, action) => {
      if (state.user) {
        state.user.communityIds = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  setOpenSidebar,
  updateUserCommunityIds,
} = authSlice.actions;
export default authSlice.reducer;
