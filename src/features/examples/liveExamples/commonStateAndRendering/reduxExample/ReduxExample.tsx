import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
    setName,
    selectName,
    selectClickCountA,
    selectClickCountB,
    incrementClickCountA,
    incrementClickCountB,
    selectWaitTime,
    setWaitTime,
} from './reduxExampleSlice';
import { ExampleDisplay } from "features/examples/ExampleDisplay";

const code = `// ReduxExample.tsx
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
    setName,
    selectName,
    selectClickCountA,
    selectClickCountB,
    incrementClickCountA,
    incrementClickCountB,
    selectWaitTime,
    setWaitTime,
} from './reduxExampleSlice';

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}


const NameComponent = () => {
    const name = useAppSelector(selectName)
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = () => {
    const clickCountA = useAppSelector(selectClickCountA);
    const waitTime = useAppSelector(selectWaitTime);
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count A {clickCountA}
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
            <NameComponent />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {
    const clickCountA = useAppSelector(selectClickCountA)
    const clickCountB = useAppSelector(selectClickCountB)
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count A: {clickCountA}
            <br />
            Click Count B: {clickCountB}
        </div>
    );
};

const ChildSet = () => {
    const dispatch = useAppDispatch();
    return (
        <>
            <button onClick={() => dispatch(incrementClickCountB())}>
                Button B
            </button>
            <br />
            <div className="flex-children">
                <ChildComponent2 />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2 />
            </div>
        </>
    )
}

const InputControls = () => {
    const dispatch = useAppDispatch();
    const waitTime = useAppSelector(selectWaitTime)
    const [waitTimeText, setWaitTimeText] = useState('0')
    return (

        <div className="example-controls">
            <div className="example-field">
                <input
                    value={waitTimeText}
                    type="number"
                    onChange={(e) => setWaitTimeText(e.target.value)}
                />
                <button
                    onClick={() => dispatch(setWaitTime(waitTimeText))}
                >
                    Update wait time
                </button>
            </div>

            <div className="example-field">
                <label>Name:</label>
                <input type="text" id="fname" name="fname" onChange={(e) => {
                    dispatch(setName(e.target.value))
                    return e.target.value
                }}
                />
            </div>
            <div className="example-field">
                <button onClick={() => dispatch(incrementClickCountA())}>
                    Button A
                </button>
            </div>
        </div>
    )
}

const ReduxComponent = () => {
    return (
        <>
            Common State and Rendering: Redux
            <br />
            <InputControls />
            <br />
            <ChildComponent />
            <br />
            <ChildSet />
        </>
    );
}`

const sliceCode = `// reduxExampleSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

type ExampleState = {
    name: string;
    clickCountA: number;
    clickCountB: number;
}

const initialState: ExampleState = {
    name: '',
    clickCountA: 0,
    clickCountB: 0,
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
        }
    },
});

export const { setName, incrementClickCountA, incrementClickCountB } = reduxExampleSlice.actions;

export const selectName = (state: RootState) => state.reduxExample.name;
export const selectClickCountA = (state: RootState) => state.reduxExample.clickCountA;
export const selectClickCountB = (state: RootState) => state.reduxExample.clickCountB;

export default reduxExampleSlice.reducer;`

const hooksCode = `// hooks.ts
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./redux/store";

// Use throughout your app instead of plain \`useAppDispatch\` and \`useSelector\`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`
// end

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}


const NameComponent = () => {
    const name = useAppSelector(selectName)
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = () => {
    const clickCountA = useAppSelector(selectClickCountA);
    const waitTime = useAppSelector(selectWaitTime);
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count A {clickCountA}
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
            <NameComponent />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {
    const clickCountA = useAppSelector(selectClickCountA)
    const clickCountB = useAppSelector(selectClickCountB)
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count A: {clickCountA}
            <br />
            Click Count B: {clickCountB}
        </div>
    );
};

const ChildSet = () => {
    const dispatch = useAppDispatch();
    return (
        <>
            <button onClick={() => dispatch(incrementClickCountB())}>
                Button B
            </button>
            <br />
            <div className="flex-children">
                <ChildComponent2 />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2 />
            </div>
        </>
    )
}

const InputControls = () => {
    const dispatch = useAppDispatch();
    const waitTime = useAppSelector(selectWaitTime)
    const [waitTimeText, setWaitTimeText] = useState('0')
    return (

        <div className="example-controls">
            <div className="example-field">
                <input
                    value={waitTimeText}
                    type="number"
                    onChange={(e) => setWaitTimeText(e.target.value)}
                />
                <button
                    onClick={() => dispatch(setWaitTime(waitTimeText))}
                >
                    Update wait time
                </button>
            </div>

            <div className="example-field">
                <label>Name:</label>
                <input type="text" id="fname" name="fname" onChange={(e) => {
                    dispatch(setName(e.target.value))
                    return e.target.value
                }}
                />
            </div>
            <div className="example-field">
                <button onClick={() => dispatch(incrementClickCountA())}>
                    Button A
                </button>
            </div>
        </div>
    )
}

const ReduxComponent = () => {
    return (
        <>
            Common State and Rendering: Redux
            <br />
            <InputControls />
            <br />
            <ChildComponent />
            <br />
            <ChildSet />
        </>
    );
}

const ReduxDescription = () => {
    return (
        <>
            <p>
                In this example, the state variables for the click counts, text value, and wait time have been moved into a "@redux/toolkit" slice.
            </p>
            <p>
                If you click the buttons, you will see that only the components that use each value get re-rendered when the click counts update.
                If you enter text into the name field, you will see that the pieces rendered are even smaller because they are contained to the "NameComponent" that is used within each child component.
            </p>
            <p>
                Updating the wait time will result in "Button A" clicks taking longer but the other interactions won't re-render the "slow" component.
            </p>
            <p>Redux is not the only way to get state data sent to deeply nested components but it is one of the easiest to control re-renders as long as you are careful with your selectors and reducers.</p>
            <CodeBlock code={code} />
            <CodeBlock code={sliceCode} />
            <CodeBlock code={hooksCode} />
        </>
    )
}

const ReduxCombined = () => <ExampleDisplay descriptionBlock={<ReduxDescription />} componentBlock={<ReduxComponent />} />

export default ReduxCombined;