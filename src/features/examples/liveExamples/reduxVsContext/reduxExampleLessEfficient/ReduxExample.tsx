import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
    setName,
    selectReduxExample,
    incrementClickCountA,
    incrementClickCountB,
    setWaitTime,
    selectClickCounts,
} from './reduxExampleSlice';
import { ExampleDisplay } from "features/examples/ExampleDisplay";

const code = `// ReduxExample.tsx
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
    setName,
    selectReduxExample,
    incrementClickCountA,
    incrementClickCountB,
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
    const { name } = useAppSelector(selectReduxExample)
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}

let childComponentRenderCount = 0;
const ChildComponent = () => {
    const { clickCountA } = useAppSelector(selectReduxExample);
    const { waitTime } = useAppSelector(selectReduxExample);
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count A {clickCountA}
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
            <br />
            Child One - Render Count {childComponentRenderCount++}
            <br />
            <NameComponent />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {
    const { clickCountA, clickCountB } = useAppSelector(selectClickCounts);
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
    const { waitTime } = useAppSelector(selectReduxExample)
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

const ReduxLessEfficientComponent = () => {
    return (
        <>
            Context vs Redux: Redux Less Efficient
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
    const { name } = useAppSelector(selectReduxExample)
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}

let childComponentRenderCount = 0;
const ChildComponent = () => {
    const { clickCountA } = useAppSelector(selectReduxExample);
    const { waitTime } = useAppSelector(selectReduxExample);
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One - Click Count A {clickCountA}
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
            <br />
            Child One - Render Count {childComponentRenderCount++}
            <br />
            <NameComponent />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {
    const { clickCountA, clickCountB } = useAppSelector(selectClickCounts);
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
    const { waitTime } = useAppSelector(selectReduxExample)
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

const ReduxLessEfficientComponent = () => {
    return (
        <>
            Context vs Redux: Redux Less Efficient
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
            <div>
                <p>
                    This example is to illustrate that just using redux in and of itself is not a fix for unwanted re-renders. In this example, we have a selector that is selecting the slice as oppose to more targetted properties.
                    The components using that selector then deconstruct the desired properties from the returned data.
                </p>
                <p>
                    This has similar issues to the context example. All of the components end up re-rendering regardless of if the state values they reference have changed.
                </p>
                <p>
                    There is even an attempt to limit this with a selector that just returns clickCountA and clickCountB. This does not work either but for a different reason. The return statement of "selectClickCounts" creates a NEW OBJECT each time the function gets called.
                    The object may have the same value but it occupies a new reference in the browsers memory.
                    When you try to run equality comparisons on objects in javascript, the memory location is actually what is being compared as oppose to object value.
                    This poses a problem for any "object" in javascript. Objects include JSON objects, arrays, and functions (essentially anything that would return 'object' if you ran "typeof variableName").
                </p>
                <p>
                    It can be tedious and difficult to manage individual selectors for many properties. Luckily, redux provides ways to work around this problem that will be covered in another example.
                </p>
            </div>
            <CodeBlock code={code} />
            <CodeBlock code={sliceCode} />
            <CodeBlock code={hooksCode} />
        </>
    )
}

const ReduxLessEfficientCombined = () => <ExampleDisplay descriptionBlock={<ReduxDescription />} componentBlock={<ReduxLessEfficientComponent />} />

export default ReduxLessEfficientCombined;