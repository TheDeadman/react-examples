import React, { useState } from "react";
import ProblematicExample from "./ProblematicExample";
import OptimizedExample from "./OptimizedVersion";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";


export const StateAndRenderingExample = () => {
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
      >
        <ToggleButton value="problematic">Problematic</ToggleButton>
        <ToggleButton value="optimized">Better</ToggleButton>
      </ToggleButtonGroup>

      <br />
      {exampleVersion === 'problematic' && <ProblematicExample />}
      {exampleVersion === 'optimized' && <OptimizedExample />}
    </>
  )
};
