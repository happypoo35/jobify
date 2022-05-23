import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { loadState, saveState } from "./localStorage";
import userReducer from "./slice.user";
import globalReducer from "./slice.global";
import { throttle } from "lodash";

const preloadedState = {
  user: loadState("user"),
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    global: globalReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(
  throttle(() => {
    saveState(store.getState().user, "user");
  }, 1000)
);
