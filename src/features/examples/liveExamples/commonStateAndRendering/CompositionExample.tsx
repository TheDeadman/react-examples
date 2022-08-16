import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";

// start
const code = `import React, { useState } from "react";

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}

const NameComponent = ({ name }: { name: string }) => {
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = (
    { waitTime, clickCountA, name }: { waitTime: number; clickCountA: number; name: string }
) => {
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Click Count A {clickCountA}
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
            <br />
            <NameComponent name={name} />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = (
    { clickCountA, clickCountB, name }: { clickCountA: number, clickCountB: number; name: string }
) => {
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent name={name} />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count A: {clickCountA}
            <br />
            Click Count B: {clickCountB}
        </div>
    );
};

const ChildSet = ({ name, clickCountA }: { name: string, clickCountA: number }) => {
    const [clickCountB, setClickCountB] = useState(0)

    return (
        <>
            <button onClick={() => setClickCountB(clickCountB + 1)}>
                Button B
            </button>
            <br />
            <div className="flex-children">
                <ChildComponent2
                    name={name}
                    clickCountA={clickCountA}
                    clickCountB={clickCountB}
                />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2
                    name={name}
                    clickCountA={clickCountA}
                    clickCountB={clickCountB}
                />
            </div>
        </>
    )
}

export const ComposedComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('0')
    const [clickCountA, setClickCountA] = useState(0);
    const [name, setName] = useState('')
    return (
        <>
            Props vs State Composition
            <br />
            <div className="example-controls">
                <div className="example-field">
                    <input
                        value={waitTimeField}
                        type="number"
                        onChange={(e) => setWaitTimeField(e.target.value)}
                    />
                    <button
                        onClick={() => setWaitTime(parseInt(waitTimeField))}
                    >
                        Update wait time
                    </button>
                </div>

                <div className="example-field">
                    <label>Name:</label>
                    <input
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="example-field">
                    <button onClick={() => setClickCountA(clickCountA + 1)}>
                        Button A
                    </button>
                </div>
            </div>
            < br />

            <ChildComponent
                waitTime={waitTime}
                name={name}
                clickCountA={clickCountA}
            />

            <br />

            <ChildSet clickCountA={clickCountA} name={name} />
        </>
    );
}`

// end
function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}


const NameComponent = ({ name }: { name: string }) => {
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}


const ChildComponent = (
    { waitTime, clickCountA, name }: { waitTime: number; clickCountA: number; name: string }
) => {
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Click Count A {clickCountA}
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
            <br />
            <NameComponent name={name} />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = (
    { clickCountA, clickCountB, name }: { clickCountA: number, clickCountB: number; name: string }
) => {
    return (
        <div style={{ background: "blue" }}>
            <br />
            <NameComponent name={name} />
            <br />
            Rendered {renderCountTwo++} times
            <br />
            Click Count A: {clickCountA}
            <br />
            Click Count B: {clickCountB}
        </div>
    );
};

const ChildSet = ({ name, clickCountA }: { name: string, clickCountA: number }) => {
    const [clickCountB, setClickCountB] = useState(0)

    return (
        <>
            <button onClick={() => setClickCountB(clickCountB + 1)}>
                Button B
            </button>
            <br />
            <div className="flex-children">
                <ChildComponent2
                    name={name}
                    clickCountA={clickCountA}
                    clickCountB={clickCountB}
                />
                &nbsp;&nbsp;&nbsp;
                <ChildComponent2
                    name={name}
                    clickCountA={clickCountA}
                    clickCountB={clickCountB}
                />
            </div>
        </>
    )
}

export const ComposedComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('0')
    const [clickCountA, setClickCountA] = useState(0);
    const [name, setName] = useState('')
    return (
        <>
            Common State and Rendering: Composition
            <br />
            <div className="example-controls">
                <div className="example-field">
                    <input
                        value={waitTimeField}
                        type="number"
                        onChange={(e) => setWaitTimeField(e.target.value)}
                    />
                    <button
                        onClick={() => setWaitTime(parseInt(waitTimeField))}
                    >
                        Update wait time
                    </button>
                </div>

                <div className="example-field">
                    <label>Name:</label>
                    <input
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="example-field">
                    <button onClick={() => setClickCountA(clickCountA + 1)}>
                        Button A
                    </button>
                </div>
            </div>
            < br />

            <ChildComponent
                waitTime={waitTime}
                name={name}
                clickCountA={clickCountA}
            />

            <br />

            <ChildSet clickCountA={clickCountA} name={name} />
        </>
    );
}

const ComposedDescription = () => {
    return (<>
        <div>
            <p>
                In this version of the example, we combine both of the blue components into their own component in order to deal with their common click count state at a lower level in the react tree.
                This allows the clickCountB state variable to be updated without causing child one to re-run the "slow" code but it wouldn't allow for the "name" state variable to be updated without causing everything to re-render again.
            </p>
            <p>
                It can also be a pain when you have to use "prop drilling" to send data down the react tree multiple levels.
            </p>
        </div>
        <CodeBlock code={code} />
    </>)
}

const ComposedCombined = () => <ExampleDisplay descriptionBlock={<ComposedDescription />} componentBlock={<ComposedComponent />} />

export default ComposedCombined;