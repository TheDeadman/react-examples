import React, { ReactNode, useEffect, useMemo, useState } from "react";
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
    selectClickCounts,
    incrementOtherClickCountA,
    selectTestArray,
} from './reduxExampleSlice';
import { ExampleDisplay } from "features/examples/ExampleDisplay";
import { selectOtherClickCountA } from "../reduxExampleLessEfficient/reduxExampleSlice";

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

let childComponentRenderCount = 0;
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
            Child One - Render Count {childComponentRenderCount++}
            <br />
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
            Context vs Redux: Redux
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

const useSomeHook = () => {
    const hookOne = () => {
        console.log("HookOne");
    }

    const hookTwo = () => {
        console.log("HookTwo")
    }

    return {
        hookOne,
        hookTwo
    }
}

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}


const NameComponent = ({ hook }: { hook?: () => void }) => {
    const name = useAppSelector(selectName)
    hook?.();
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}

const OtherComp = ({ children }: { children: ReactNode }) => {
    return <><div>{children}-test</div></>
}

const OtherCompList = ({ testArray }: { testArray: { title: string }[] }) => {
    return (
        <>
            {testArray.map((item, index) => <OtherComp key={index}>{item.title}</OtherComp>)}
        </>
    )
}

let childComponentRenderCount = 0;
const ChildComponent = () => {
    const { clickCountA } = useAppSelector(selectClickCounts);
    const testArray = useAppSelector(selectTestArray);
    // const clickCountA = useAppSelector(selectClickCountA);
    const waitTime = useAppSelector(selectWaitTime);
    const time = wait(waitTime);

    const memoizedList = useMemo(() => <OtherCompList testArray={testArray} />, [testArray]);

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
            {memoizedList}
            {/* <OtherCompList testArray={testArray} /> */}
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {
    const clickCountA = useAppSelector(selectClickCountA)
    const clickCountB = useAppSelector(selectClickCountB)
    const otherClickCountA = useAppSelector(selectOtherClickCountA)
    const { hookOne } = useSomeHook();
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent hook={hookOne} />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count A: {clickCountA}
            <br />
            Click Count B: {clickCountB}
            <br />
            Click Count A2: {otherClickCountA}
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
                <button onClick={() => dispatch(incrementOtherClickCountA())}>
                    Button A2
                </button>
            </div>
        </div>
    )
}

const ReduxComponent = () => {
    return (
        <>
            Context vs Redux: Redux
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
            <CodeBlock code={code} />
            <CodeBlock code={sliceCode} />
            <CodeBlock code={hooksCode} />
        </>
    )
}

const ReduxCombined = () => <ExampleDisplay descriptionBlock={<ReduxDescription />} componentBlock={<ReduxComponent />} />

export default ReduxCombined;