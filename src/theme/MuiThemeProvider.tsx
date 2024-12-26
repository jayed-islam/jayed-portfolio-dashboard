"use client";

import { ThemeProvider } from "@mui/material";
import React, { FC } from "react";
import theme from "./theme";

interface IMuiThemeProviderProps {
  children: React.ReactNode;
}

const MuiThemeProvider: FC<IMuiThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
