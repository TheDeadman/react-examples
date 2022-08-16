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

const ExampleContext = createContext<{ exampleContextState: ExampleState, setExampleContextState: React.Dispatch<React.SetStateAction<ExampleState>> } | undefined>(undefined);

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

            setExampleContextState({ ...exampleContextState, clickCountA: exampleContextState.clickCountA + 1 })
        }
    }
}

export const useIncrementClickCountB = () => {
    const exampleContext = useContext(ExampleContext);

    return () => {
        if (exampleContext) {
            const { exampleContextState, setExampleContextState } = exampleContext;

            setExampleContextState({ ...exampleContextState, clickCountB: exampleContextState.clickCountB + 1 })
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
}