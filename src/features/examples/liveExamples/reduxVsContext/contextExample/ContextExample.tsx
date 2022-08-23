import React, { useCallback, useEffect, useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";
import { ExampleContextProvider, useSetContextName, useContextName, useClickCountB, useClickCountA, useWaitTime, useIncrementClickCountB, useSetWaitTime, useIncrementClickCountA } from "./ContextProvider";


const code = `// ContextExample.tsx
import React, { useState } from "react";
import { ExampleDisplay } from "features/examples/ExampleDisplay";
import { 
    ExampleContextProvider, 
    useSetContextName, 
    useContextName, 
    useClickCountB, 
    useClickCountA, 
    useWaitTime, 
    useIncrementClickCountB, 
    useSetWaitTime, 
    useIncrementClickCountA 
} from "./ContextProvider";

function wait(ms: number) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
    return now;
}


const NameComponent = () => {
    const name = useContextName();
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}

let childComponentRenderCount = 0;
const ChildComponent = () => {
    const clickCountA = useClickCountA();
    const waitTime = useWaitTime();
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
    const clickCountA = useClickCountA();
    const clickCountB = useClickCountB();
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
    const incrementClickCountB = useIncrementClickCountB();
    return (
        <>
            <button onClick={() => incrementClickCountB()}>
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
    const incrementClickCountA = useIncrementClickCountA();
    const setContextName = useSetContextName();
    const setWaitTime = useSetWaitTime();
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
                    onClick={() => setWaitTime(parseInt(waitTimeText))}
                >
                    Update wait time
                </button>
            </div>

            <div className="example-field">
                <label>Name:</label>
                <input type="text" id="fname" name="fname" onChange={(e) => {
                    setContextName(e.target.value);
                    return e.target.value
                }}
                />
            </div>
            <div className="example-field">
                <button onClick={() => incrementClickCountA()}>
                    Button A
                </button>
            </div>
        </div>
    )
}

const ContextExampleComponent = () => {
    return (
        <>
            <ExampleContextProvider>
                Common State and Rendering: Redux
                <br />
                <InputControls />
                <br />
                <ChildComponent />
                <br />
                <ChildSet />
            </ExampleContextProvider>
        </>
    );
}`
// end

const contextCode = `// ContextProvider.tsx
import { createContext, useContext, useState, ReactNode } from "react";

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

const ExampleContext = createContext<{ 
    exampleContextState: ExampleState, 
    setExampleContextState: React.Dispatch<React.SetStateAction<ExampleState>> 
} | undefined>(undefined);

export const useContextName = () => {
    const context = useContext(ExampleContext);

    if (context) {

        const { exampleContextState } = context;
        return exampleContextState?.name;
    }
    return ''
}

export const useClickCountA = () => {
    const context = useContext(ExampleContext);

    if (context) {

        const { exampleContextState } = context;
        return exampleContextState.clickCountA;
    }
    return 0;
}


export const useClickCountB = () => {
    const context = useContext(ExampleContext);

    if (context) {

        const { exampleContextState } = context;
        return exampleContextState.clickCountB;
    }
    return 0;
}

export const useWaitTime = () => {
    const context = useContext(ExampleContext);

    if (context) {

        const { exampleContextState } = context;
        return exampleContextState.waitTime;
    }
    return 0;
}

export const useIncrementClickCountA = () => {
    const exampleContext = useContext(ExampleContext);

    return () => {
        if (exampleContext) {
            const { exampleContextState, setExampleContextState } = exampleContext;

            setExampleContextState({ 
                ...exampleContextState, 
                clickCountA: exampleContextState.clickCountA + 1 
            })
        }
    }
}

export const useIncrementClickCountB = () => {
    const exampleContext = useContext(ExampleContext);

    return () => {
        if (exampleContext) {
            const { exampleContextState, setExampleContextState } = exampleContext;

            setExampleContextState({ 
                ...exampleContextState, 
                clickCountB: exampleContextState.clickCountB + 1 
            })
        }
    }
}

export const useSetWaitTime = () => {
    const exampleContext = useContext(ExampleContext);

    return (newTime: number) => {
        if (exampleContext) {
            const { exampleContextState, setExampleContextState } = exampleContext;

            setExampleContextState({ ...exampleContextState, waitTime: newTime })
        }
    }
}

export const useSetContextName = () => {
    const exampleContext = useContext(ExampleContext);

    return (str: string) => {
        if (exampleContext) {
            const { exampleContextState, setExampleContextState } = exampleContext;

            setExampleContextState({ ...exampleContextState, name: str })
        }
    }
}

export const ExampleContextProvider = ({ children }: { children: ReactNode }) => {
    const [exampleContextState, setExampleContextState] = useState(initialState);

    const value = { exampleContextState, setExampleContextState }
    return (
        <ExampleContext.Provider value={value}>
            {children}
        </ExampleContext.Provider>
    )
}`


const useSomeHook = () => {
    const hookOne = useCallback(() => {
        console.log("HookOne");
    }, []);

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
    const name = useContextName();
    hook?.();
    return (
        <div style={{ background: "black" }}>Hello, {name}</div>
    )
}

let childComponentRenderCount = 0;
const ChildComponent = () => {
    const clickCountA = useClickCountA();
    const waitTime = useWaitTime();
    const time = wait(waitTime);
    const { hookTwo } = useSomeHook();
    useEffect(() => {
        console.log("HOOK TWO CHANGED")
    }, [hookTwo])
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
            <NameComponent hook={hookTwo} />
            <br />
        </div>
    );
};

let renderCountTwo = 0;
const ChildComponent2 = () => {
    const clickCountA = useClickCountA();
    const clickCountB = useClickCountB();
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
        </div>
    );
};

const ChildSet = () => {
    const incrementClickCountB = useIncrementClickCountB();
    return (
        <>
            <button onClick={() => incrementClickCountB()}>
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
    const incrementClickCountA = useIncrementClickCountA();
    const setContextName = useSetContextName();
    const setWaitTime = useSetWaitTime();
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
                    onClick={() => setWaitTime(parseInt(waitTimeText))}
                >
                    Update wait time
                </button>
            </div>

            <div className="example-field">
                <label>Name:</label>
                <input type="text" id="fname" name="fname" onChange={(e) => {
                    setContextName(e.target.value);
                    return e.target.value
                }}
                />
            </div>
            <div className="example-field">
                <button onClick={() => incrementClickCountA()}>
                    Button A
                </button>
            </div>
        </div>
    )
}

const ContextExampleComponent = () => {
    return (
        <>
            <ExampleContextProvider>
                Common State and Rendering: Redux
                <br />
                <InputControls />
                <br />
                <ChildComponent />
                <br />
                <ChildSet />
            </ExampleContextProvider>
        </>
    );
}


const ContextExampleDescription = () => {
    return (
        <>
            <p>
                This example is the same as the previous redux example but is using the Context API instead of redux. I would generally suggest NOT using context in most situations, especially if there is any heavy logic in the context / hooks.
            </p>
            <p>
                You will see that we have the same issue that we had with the earlier "useState" examples. Most of the components are rendering again anytime that a piece of state changes regardless of if they use that piece or not.
                This is because Context will force ALL components referencing a piece of the state to re-render anytime a piece of the context is updated.
            </p>
            <p>
                Context can be useful but their use case is best for situations where you have a value that won't change and needs to be used deep within the app.
            </p>
            <p>Also, be careful with the "use" hooks because the code in each hook will run each time they are used in a component that renders / re-renders even if no context values change.</p>

            <CodeBlock code={code} />
            <CodeBlock code={contextCode} />
        </>
    )
}

const ContextCombined = () => <ExampleDisplay descriptionBlock={<ContextExampleDescription />} componentBlock={<ContextExampleComponent />} />

export default ContextCombined;