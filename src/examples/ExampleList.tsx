import React, { ReactNode } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { BasicExample } from './basic/BasicExample';
import { PropsVsStateExample } from './propsVsState/PropsVsState';
import { StateAndRenderingExample } from './stateAndRendering/StateAndRenderingExample';
import { CommonStateAndRenderingExample } from './commonStateAndRendering/CommonStateAndRenderingExample';
import { BeforeStarting } from './beforeStarting/BeforeStarting';

const TooLazyToRefactor = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ width: 1235, display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'thin solid white' }}>
      {children}
    </div>
  )
}
export const ExampleList = () => {
  const match = useParams()
  console.log(match)
  const navigate = useNavigate();
  const code =
    "import * as React from 'react';\nimport Box from '@mui/material/Box';\n\nexport default function BoxSx() {\n  return (\n    <Box\n      sx={{\n        width: 300,\n        height: 300,\n        backgroundColor: 'primary.dark',\n        '&:hover': {\n          backgroundColor: 'primary.main',\n          opacity: [0.9, 0.8, 0.7],\n        },\n      }}\n    />\n  );\n}\n";
  return (
    <>
      <Box sx={{ minWidth: 120, width: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select an example</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={match.exampleName || ""}
            label="Select an example"
            onChange={(e) => navigate(`/${e.target.value}`)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'basic'}>Basic</MenuItem>
            <MenuItem value={'propsVsState'}>Props vs State</MenuItem>
            <MenuItem value={'stateAndRendering'}>State and Rendering</MenuItem>
            <MenuItem value={'commonStateAndRendering'}>Common State and Rendering</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <br />
      {!match.exampleName && <BeforeStarting />}
      {match.exampleName === "basic" && <TooLazyToRefactor><BasicExample /></TooLazyToRefactor>}
      {match.exampleName === "propsVsState" && <TooLazyToRefactor><PropsVsStateExample /></TooLazyToRefactor>}
      {match.exampleName === "stateAndRendering" && <TooLazyToRefactor><StateAndRenderingExample /></TooLazyToRefactor>}
      {match.exampleName === "commonStateAndRendering" && <TooLazyToRefactor><CommonStateAndRenderingExample /></TooLazyToRefactor>}
    </>
  );
};
