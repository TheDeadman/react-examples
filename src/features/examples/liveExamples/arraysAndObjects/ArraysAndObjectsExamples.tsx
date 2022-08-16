import React, { useState } from "react";
// import ProblematicExample from "./ProblematicExample";
import UnoptimizedExample from "./unoptimized/UnoptimizedExample";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import './arraysAndObjects.css';


export const ArraysAndObjectsExamples = () => {
  const [exampleVersion, setExampleVersion] = useState('unoptimized');
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
        <ToggleButton value="unoptimized">Unoptimized</ToggleButton>
        <ToggleButton value="redux">Redux</ToggleButton>
      </ToggleButtonGroup>

      <br />
      {exampleVersion === 'unoptimized' && <UnoptimizedExample />}
    </>
  )
};
