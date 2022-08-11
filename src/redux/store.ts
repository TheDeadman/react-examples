import { configureStore } from "@reduxjs/toolkit";
import reduxExampleReducer from "examples/commonStateAndRendering/reduxExample/reduxExampleSlice";
import drawerMenuReducer from "features/drawerMenu/drawerMenuSlice";

export const store = configureStore({
  reducer: {
    drawerMenu: drawerMenuReducer,
    reduxExample: reduxExampleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
