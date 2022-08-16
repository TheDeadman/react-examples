import React, { useState } from "react";
import ProblematicExample from "./ProblematicExample";
import { Select, MenuItem, ToggleButtonGroup, ToggleButton } from "@mui/material";
import CompositionExample from "./CompositionExample";
import ReduxExample from "./reduxExample/ReduxExample";


export const CommonStateAndRenderingExample = () => {
  const [exampleVersion, setExampleVersion] = useState('problematic');
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
      >        <ToggleButton value={'problematic'}>Problematic</ToggleButton>
        <ToggleButton value={'composed'}>Composed</ToggleButton>
        <ToggleButton value={'redux'}>Redux</ToggleButton>
      </ToggleButtonGroup>

      <br />
      {exampleVersion === 'problematic' && <ProblematicExample />}
      {exampleVersion === 'composed' && <CompositionExample />}
      {exampleVersion === 'redux' && <ReduxExample />}
    </>
  )
};
