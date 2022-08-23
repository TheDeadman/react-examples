import { configureStore } from "@reduxjs/toolkit";
import reduxExampleReducer from "features/examples/liveExamples/commonStateAndRendering/reduxExample/reduxExampleSlice";
import { otherReducer } from "features/examples/liveExamples/reduxVsContext/reduxExampleLessEfficient/reduxExampleSlice";
import drawerMenuReducer from "features/drawerMenu/drawerMenuSlice";
import unoptimizedDotaHeroReducer from 'features/examples/liveExamples/arraysAndObjects/unoptimized/unoptimizedSlice';

export const store = configureStore({
  reducer: {
    drawerMenu: drawerMenuReducer,
    reduxExample: reduxExampleReducer,
    unoptimizedDotaHeroes: unoptimizedDotaHeroReducer,
    otherSlice: otherReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
