import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const selectName = (state: RootState) => state.reduxExample.name;
export const selectClickCountA = (state: RootState) => state.reduxExample.clickCountA;
export const selectClickCountB = (state: RootState) => state.reduxExample.clickCountB;
export const selectWaitTime = (state: RootState) => state.reduxExample.waitTime;

export default reduxExampleSlice.reducer;