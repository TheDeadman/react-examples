import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";

const code = `import React, { useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}


let renderCount = 0;
const ChildComponent = ({ waitTime }: { waitTime: number; }) => {
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One has rendered {renderCount++} times
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = ({ clickCountA }: { clickCountA: number }) => {
    return (
        <div style={{ background: "blue" }}>
            Child Two has rendered {renderCountTwo++} times
            <br />
            Click Count: {clickCountA}
        </div>
    );
};

const ProblematicComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [clickCountA, shetClickCountA] = useState(0)
    const [chlickCountB, shetClickCountB] = useState(0)
    return (
        <>
            <br />
            Props vs State Problematic
            <br />
            <button onClick={() => waitTime === 0 ? setWaitTime(1000) : setWaitTime(0)}>
                {waitTime === 0 ? "Increase wait time" : "Decrease wait time"}
            </button>
            <br />
            <button onClick={() => shetClickCountA(clickCountA + 1)}>
                Click Count - {clickCountA}
            </button>
            < br />
            <ChildComponent waitTime={waitTime} />
            <br />
            <button onClick={() => shetClickCountB(chlickCountB + 1)}>
                Button B
            </button>
            <br />
            <ChildComponent2 clickCountA={chlickCountB} />
        </>
    );
}`

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}

let renderCount = 0;
const ChildComponent = ({ waitTime }: { waitTime: number; }) => {
    const time = wait(waitTime);
    return (
        <div style={{ background: "green" }}>
            Child One has rendered {renderCount++} times
            <br />
            Wait time is: {waitTime}
            <br />
            Rendered at: {time}
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = ({ clickCountB }: { clickCountB: number }) => {
    return (
        <div style={{ background: "blue" }}>
            Child Two has rendered {renderCountTwo++} times
            <br />
            Click Count B: {clickCountB}
        </div>
    );
};

const ProblematicComponent = () => {
    const [waitTime, setWaitTime] = useState(0)
    const [clickCountA, shetClickCountA] = useState(0)
    const [chlickCountB, shetClickCountB] = useState(0)
    return (
        <>
            <br />
            Props vs State Problematic
            <br />
            <button onClick={() => waitTime === 0 ? setWaitTime(1000) : setWaitTime(0)}>
                {waitTime === 0 ? "Increase wait time" : "Decrease wait time"}
            </button>
            <br />
            <button onClick={() => shetClickCountA(clickCountA + 1)}>
                Click Count - {clickCountA}
            </button>
            < br />
            <ChildComponent waitTime={waitTime} />
            <br />
            <button onClick={() => shetClickCountB(chlickCountB + 1)}>
                Button B
            </button>
            <br />
            <ChildComponent2 clickCountB={chlickCountB} />
        </>
    );
}

const ProblematicDescription = () => {
    return (
        <>
            <div>
                <p>
                    This example demonstrates some of the implications related to where you place state variables.
                </p>
                <p>
                    This example has a couple of components that display the number of times they have rendered.
                    The parent component has a state variable tracking how many times the "Click Count" button has been click and a state variable tracking how many times the "Button B" button has been clicked.
                </p>
                <p>
                    Ignore the "Increase wait time" button for now.
                </p>
                <p>
                    If you click the "Click Count" button, you will see that the number on the button increases.
                    Also, all of the components re-render even though the child components don't reference the state variable.
                    If you click the "Button B" button, the count that is sent to the second child component is updated and every component on the page re-renders.
                </p>
                <p>
                    This isn't a problem with the current app, but imagine one of the child components has some expensive calculations and renders many children underneath it.
                </p>
                <p>
                    We can simulate this by clicking the "Increase wait time" button. This will cause the first child component to take 2 seconds to render.
                </p>
                <p>
                    If you try clicking either of the buttons now, you will see that the app freezes up while the components are re-rendering.
                </p>
                <br />
                Click on the "Show optimized version" button to see a potential technique to overcome this issue.
            </div>
            <CodeBlock code={code} />
        </>
    )
}

const ProblematicCombined = () => {
    return (
        <ExampleDisplay descriptionBlock={<ProblematicDescription />} componentBlock={<ProblematicComponent />} />
    )
}

export default ProblematicCombined;