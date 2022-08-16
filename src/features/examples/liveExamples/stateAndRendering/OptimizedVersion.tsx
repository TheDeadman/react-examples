import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";

const code = `import React, { useState } from "react";

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

let renderCount = 0;
const ChildComponent = ({ waitTime }: { waitTime: number; }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One has rendered {renderCount++} times
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {

    const [clickCountB, setClickCountB] = useState(0)
    return (
        <>
            <button onClick={() => setClickCountB(clickCountB + 1)}>
                Button B
            </button>
            <br />
            <div style={{ background: "blue" }}>
                Child Two has rendered {renderCountTwo++} times
                <br />
                Click Count B: {clickCountB}
            </div>
        </>
    );
};

const OptimizedComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [clickCountA, setClickCountA] = useState(0)
    return (
        <>
            Props vs State Optimized
            <br />
            <button onClick={() => waitTime === 0 ? setWaitTime(2000) : setWaitTime(0)}>
                {waitTime === 0 ? "Increase wait time" : "Decrease wait time"}
            </button>
            <br />
            <button onClick={() => setClickCountA(clickCountA + 1)}>
                Click Count - {clickCountA}
            </button>
            < br />
            <ChildComponent waitTime={waitTime} />
            <br />
            <ChildComponent2 />
        </>
    );
}`

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

let renderCount = 0;
const ChildComponent = ({ waitTime }: { waitTime: number; }) => {
    wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One has rendered {renderCount++} times
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {

    const [clickCountB, setClickCountB] = useState(0)
    return (
        <>
            <button onClick={() => setClickCountB(clickCountB + 1)}>
                Button B
            </button>
            <br />
            <div style={{ background: "blue" }}>
                Child Two has rendered {renderCountTwo++} times
                <br />
                Click Count B: {clickCountB}
            </div>
        </>
    );
};

const OptimizedComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [clickCountA, setClickCountA] = useState(0)
    return (
        <>

            Props vs State Optimized
            <br />
            <button onClick={() => waitTime === 0 ? setWaitTime(2000) : setWaitTime(0)}>
                {waitTime === 0 ? "Increase wait time" : "Decrease wait time"}
            </button>
            <br />
            <button onClick={() => setClickCountA(clickCountA + 1)}>
                Click Count A - {clickCountA}
            </button>
            < br />
            <ChildComponent waitTime={waitTime} />
            <br />
            <ChildComponent2 />
        </>
    );
}

const OptimizedDescription = () => {
    return (
        <>
            <div>
                This version is similar to the previous but the "Button B" button and state variable have been moved into ChildComponent 2.
                <br />
                If you click on the "Button B" button now, you will see that only ChildComponent2 re-renders.
                <br />
                If you click the "Increase wait time" button, you will see that clicking the "Click Count" button is still slow but the second components button is not.
                <br />
                Designing state around this can be a pain in many situations.

            </div>
            <CodeBlock code={code} />

        </>
    )
}

const OptimizedCombined = () => {
    return (
        <ExampleDisplay descriptionBlock={<OptimizedDescription />} componentBlock={<OptimizedComponent />} />
    )
}

export default OptimizedCombined;