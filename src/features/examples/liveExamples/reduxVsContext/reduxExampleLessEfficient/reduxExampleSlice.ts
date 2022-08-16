import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

type ExampleState = {
    name: string;
    clickCountA: number;
    clickCountB: number;
    waitTime: number;
}

const initialState: ExampleState = {
    name: '',
    clickCountA: 0,
    clickCountB: 0,
    waitTime: 0
};

export const reduxExampleSlice = createSlice({
    name: "reduxExample",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        incrementClickCountA: (state) => {
            state.clickCountA += 1;
        },
        incrementClickCountB: (state) => {
            state.clickCountB += 1;
        },
        setWaitTime: (state, action: PayloadAction<string>) => {
            state.waitTime = parseInt(action.payload);
        }
    },
});

export const { setName, incrementClickCountA, incrementClickCountB, setWaitTime } = reduxExampleSlice.actions;

export const selectReduxExample = (state: RootState) => state.reduxExample;
export const selectClickCounts = (state: RootState) => {
    return { clickCountA: state.reduxExample.clickCountA, clickCountB: state.reduxExample.clickCountB }
}

export default reduxExampleSlice.reducer;