"use client";

import React, { ReactNode } from "react";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  children: ReactNode;
}

const LocalizationProvider = ({ children }: Props) => {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </MuiLocalizationProvider>
  );
};

export default LocalizationProvider;
