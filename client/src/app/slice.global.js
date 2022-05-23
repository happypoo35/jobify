import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
  sidebar: false,
  page: 1,
  limit: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.alert = payload;
    },
    toggleSidebar: (state, { payload }) => {
      payload
        ? (state.sidebar = payload.value)
        : (state.sidebar = !state.sidebar);
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setLimit: (state, { payload }) => {
      state.limit = payload;
    },
  },
});

export const selectAlert = (state) => state.global.alert;
export const selectSidebar = (state) => state.global.sidebar;
export const selectPage = (state) => state.global.page;
export const selectLimit = (state) => state.global.limit;

export const { setAlert, toggleSidebar, setPage, setLimit } =
  globalSlice.actions;

export default globalSlice.reducer;
