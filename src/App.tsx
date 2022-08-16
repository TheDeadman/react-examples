import React from 'react';
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "features/header/Header";
import { useAppDispatch } from "redux/hooks";
import { ExampleList } from "features/examples/ExampleList";

import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const baseTime = 0;

function App() {

  useEffect(() => {
    performance.measure("app rendered");
  }, []);
  return (
    <>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <div className="App">
            <Routes>
              <Route path="/:exampleName" element={<ExampleList />} />
              <Route path="/" element={<ExampleList />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Stack>
    </>
  );
}

export default App;
