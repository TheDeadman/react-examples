import React, { ReactNode } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";


const code = `import { ReactNode } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";

const ChildComponent = ({ text }: { text: string }) => {
  return (
    <div style={{ background: "green" }}>
      This is the child component.
      <br />
      {text}
    </div>
  );
};

const ChildComponent2 = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ background: "blue" }}>
      This is the second child component.
      <br />
      {children}
    </div>
  );
};

export const BasicExample = () => {
  return (
    <>
      Basic Example
      <br />
      <ChildComponent text="Text Property Value" />
      <ChildComponent2>
        Componet 2 child<div>Inside div child</div>
      </ChildComponent2>
      <CodeBlock code={code} />
    </>
  );
};`;

const ChildComponent = ({ text }: { text: string }) => {
  return (
    <div style={{ background: "green" }}>
      This is the child component.
      <br />
      {text}
    </div>
  );
};

const ChildComponent2 = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ background: "blue" }}>
      This is the second child component.
      <br />
      {children}
    </div>
  );
};

export const BasicExample = () => {
  return (
    <>
      <div style={{ width: 500, fontSize: 15, marginBottom: 10 }}>This is a basic example of a rendered component (BasicExample). The BasicExample component renders two components as well.
        ChildComponent takes text as a property and displays it along with some hardcoded text. ChildComponent2 allows for child nodes to be nested similar to HTML.</div>
      Basic Example
      <br />
      <ChildComponent text="Text Property Value" />
      <ChildComponent2>
        Componet 2 child<div>Inside div child</div>
      </ChildComponent2>
      <CodeBlock code={code} />
    </>
  );
};
