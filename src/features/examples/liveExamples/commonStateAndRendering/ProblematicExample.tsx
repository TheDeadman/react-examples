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
            Click Count A: {clickCountA}
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
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

const ProblematicComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('0')
    const [clickCountA, setClickCountA] = useState(0)
    const [clickCountB, setClickCountB] = useState(0)
    const [name, setName] = useState('')
    return (
        <>
            Props vs State Problematic
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

            <ChildComponent
                waitTime={waitTime}
                name={name}
                clickCountA={clickCountA}
            />

            <br />

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
                <ChildComponent2
                    name={name}
                    clickCountA={clickCountA}
                    clickCountB={clickCountB}
                />
            </div>
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
            Click Count A: {clickCountA}
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

const ProblematicComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeField, setWaitTimeField] = useState('0')
    const [clickCountA, setClickCountA] = useState(0)
    const [clickCountB, setClickCountB] = useState(0)
    const [name, setName] = useState('')
    return (
        <>
            Common State and Rendering: Problematic
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


            <ChildComponent
                waitTime={waitTime}
                name={name}
                clickCountA={clickCountA}
            />
            <br />

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
    );
}

const ProblematicDescription = () => {
    return (
        <>
            <div>
                <p>
                    This example is similar to the previous example but there are more child components and a text input.
                </p>
                <p>
                    You can also put in a number to change the amount of time that it takes for child one to render. You will notice that even 100ms makes the text input feel laggy and significantly detracts from the user experience.
                </p>
                <p>
                    Also, notice how many times the components render due to the text input.
                </p>
                <p>
                    Switch to the "Composed" version and see the difference.
                </p>
            </div>
            <CodeBlock code={code} />
        </>
    )
}

const ProblematicCombined = () => <ExampleDisplay descriptionBlock={<ProblematicDescription />} componentBlock={<ProblematicComponent />} />;

export default ProblematicCombined;