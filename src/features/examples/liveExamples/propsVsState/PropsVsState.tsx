import React, { ReactNode, useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";

const code = `import React, { ReactNode, useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";

const ChildComponent = ({ text }: { text: string }) => {
  return (
    <div style={{ background: "green" }}>
      This is the child component.
      <br />
      {text}
    </div>
  );
};

const ChildComponent2 = ({ isShowingNestedComponent }: { isShowingNestedComponent: boolean }) => {
  return (
    <div style={{ background: "blue", padding: 5 }}>
      This is the second child component.
      <br />
      {isShowingNestedComponent && <ChildComponent3 />}
    </div>
  );
};

const ChildComponent3 = () => {
  return (<div style={{ background: 'darkgreen' }}>This is child component 3</div>)
}

let isShowingNestedComponent = false;
const PropsVsStateComponent = () => {
  const [clickCount, setClickCount] = useState(0)
  return (
    <>
      Props vs State
      <br />
      <br />
      <div>
        <button onClick={() => setClickCount(clickCount + 1)}>CLICK ME!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={() => isShowingNestedComponent = !isShowingNestedComponent}>Toggle Nested Component</button>
      </div>
      <br />
      <ChildComponent text={\`Button Click Count: \${clickCount}\`} />
      <ChildComponent2 isShowingNestedComponent={isShowingNestedComponent} />

    </>
  );
};`


const ChildComponent = ({ text }: { text: string }) => {
  return (
    <div style={{ background: "green" }}>
      This is the child component.
      <br />
      {text}
    </div>
  );
};

const ChildComponent2 = ({ isShowingNestedComponent }: { isShowingNestedComponent: boolean }) => {
  return (
    <div style={{ background: "blue", padding: 5 }}>
      This is the second child component.
      <br />
      {isShowingNestedComponent && <ChildComponent3 />}
    </div>
  );
};

const ChildComponent3 = () => {
  return (<div style={{ background: 'darkgreen' }}>This is child component 3</div>)
}

let isShowingNestedComponent = false;
const PropsVsStateComponent = () => {
  const [clickCount, setClickCount] = useState(0)
  return (
    <>
      Props vs State
      <br />
      <br />
      <div>
        <button onClick={() => setClickCount(clickCount + 1)}>CLICK ME!</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={() => isShowingNestedComponent = !isShowingNestedComponent}>Toggle Nested Component</button>
      </div>
      <br />
      <ChildComponent text={`Button Click Count: ${clickCount}`} />
      <ChildComponent2 isShowingNestedComponent={isShowingNestedComponent} />

    </>
  );
};

const PropsVsStateDescription = () => {
  return (
    <>
      <div>
        <p>
          This example illustrates the difference in behaviour of "props" vs "state". The main rendered component has a state value called click count.
          You can see that we are "destructuring" the value returned from the "useState" function call. useState returns an array with two items. The first item in the array is the current state value. The second item in the array is a function that can be called to update the state value.
        </p>
        <p>
          We have a button that calls "setClickCount" with the current "clickCount" value plus 1. "clickCount" is passed to the first child component as part of the text string that it will display. If you click on the "CLICK ME!" button, you will see that the update click count is displayed.
        </p>
        <p>
          Also, if you have the redux devtools highlight rendering option enabled, you will see that everything within the "PropsVsStateExample" is getting re-rendered when the state updates. This is because react renders DOWN the tree. If a component renders, every component below it in the element tree will also re-render.
        </p>

        <p>
          We also have a variable named "isShowingNestedComponent" that we are passing down to the second child component. When the value is set to true, the ChildComponent2 will display a nested child component. We also have a button to toggle that value.
          If you click on the button, you will see that nothing happens. This is because the "isShowingNestedComponent" variable was declared in a way that react does not account for. That does not mean that the value is not honored. Click the "CLICK ME!" button again and you will see that the child component appears. (If it does not appear, then click the "Toggle Nested Component" one more time and then click "CLICK ME!").
          React is honoring the "isShowingNestedComponent" value but does not track when it updates. calling "setClickCount" causes the component to re-render so that it reflects the most recent value of "isShowingNestedComponent".
        </p>
        <br />
        <b>NOTE: "isShowingNestedComponent" is an anti-pattern. This is just to demonstrate that react does not automatically track updates to props.</b>
      </div>
      <CodeBlock code={code} />
    </>
  )
}

const PropsVsStateCombined = () => {
  return (
    <ExampleDisplay descriptionBlock={<PropsVsStateDescription />} componentBlock={<PropsVsStateComponent />} />
  )
}

export default PropsVsStateCombined;