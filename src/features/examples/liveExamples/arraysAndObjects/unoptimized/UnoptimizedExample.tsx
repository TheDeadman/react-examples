import React, { ReactNode, useState } from "react";
import { CodeBlock } from "features/codeBlock/CodeBlock";
import { ExampleDisplay } from "features/examples/ExampleDisplay";
import AdvancedComponent from "./UnoptimizedComponent";


const AdvancedDescription = () => {
  return (
    <></>
  )
}

const PropsVsStateCombined = () => {
  return (
    <ExampleDisplay descriptionBlock={<AdvancedDescription />} componentBlock={<AdvancedComponent />} />
  )
}

export default PropsVsStateCombined;