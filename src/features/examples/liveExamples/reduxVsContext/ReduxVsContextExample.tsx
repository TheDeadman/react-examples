import React, { useState } from "react";
// import ProblematicExample from "./ProblematicExample";
import ContextExample from "./contextExample/ContextExample";
import ReduxExample from "./reduxExample/ReduxExample";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";


export const ContextVsReduxExample = () => {
  const [exampleVersion, setExampleVersion] = useState('context');
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    version: string,
  ) => {
    setExampleVersion(version);
  };
  return (
    <>
      <br />
      <ToggleButtonGroup
        color="primary"
        value={exampleVersion}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="context">Context</ToggleButton>
        <ToggleButton value="redux">Redux</ToggleButton>
      </ToggleButtonGroup>

      <br />
      {exampleVersion === 'context' && <ContextExample />}
      {exampleVersion === 'redux' && <ReduxExample />}
    </>
  )
};
