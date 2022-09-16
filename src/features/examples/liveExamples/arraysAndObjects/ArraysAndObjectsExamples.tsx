import React, { useState } from "react";
// import ProblematicExample from "./ProblematicExample";
import UnoptimizedExample from "./unoptimized/UnoptimizedExample";
import MemoizedExample from "./memoized/MemoizedExample";
import MemoizedTwoExample from "./memoizedTwo/MemoizedExample";
import ReduxExample from "./redux/ReduxExample";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import './arraysAndObjects.scss';
import './heroList.scss';
import './filterControls.scss';


export const ArraysAndObjectsExamples = () => {
  const [exampleVersion, setExampleVersion] = useState('unoptimized');
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    version: string,
  ) => {
    if (version) {
      setExampleVersion(version);
    }
  };
  return (
    <>
      <br />
      <ToggleButtonGroup
        color="primary"
        value={exampleVersion}
        exclusive
        onChange={handleChange}
        className="toggle-group"
      >
        <ToggleButton value="unoptimized">Unoptimized</ToggleButton>
        <ToggleButton value="memoized">Memoized</ToggleButton>
        <ToggleButton value="memoizedTwo">Memoized Two</ToggleButton>
        <ToggleButton value="redux">Redux</ToggleButton>
      </ToggleButtonGroup>

      <br />
      {exampleVersion === 'unoptimized' && <UnoptimizedExample />}
      {exampleVersion === 'memoized' && <MemoizedExample />}
      {exampleVersion === 'memoizedTwo' && <MemoizedTwoExample />}
      {exampleVersion === 'redux' && <ReduxExample />}
    </>
  )
};
