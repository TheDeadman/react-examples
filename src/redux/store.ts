import { configureStore } from "@reduxjs/toolkit";
import reduxExampleReducer from "features/examples/liveExamples/commonStateAndRendering/reduxExample/reduxExampleSlice";
import { otherReducer } from "features/examples/liveExamples/reduxVsContext/reduxExampleLessEfficient/reduxExampleSlice";
import drawerMenuReducer from "features/drawerMenu/drawerMenuSlice";
import optimizedDotaHeroes from 'features/examples/liveExamples/arraysAndObjects/redux/src/optimizedSlice';

export const store = configureStore({
  reducer: {
    drawerMenu: drawerMenuReducer,
    reduxExample: reduxExampleReducer,
    optimizedDotaHeroes: optimizedDotaHeroes,
    otherSlice: otherReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
