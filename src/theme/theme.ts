// "use client";

import {
  ThemeOptions,
  buttonClasses,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import colors from "./colors";
import { Noto_Sans_Bengali } from "next/font/google";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "700"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const options: ThemeOptions = {
  typography: {
    fontFamily: notoSansBengali.style.fontFamily,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: `16px`,
      fontWeight: 400,
      color: colors.blackWhiteBlack,
    },
    body2: {
      fontSize: `13px`,
      fontWeight: 400,
      color: colors.gray[700],
    },
    subtitle1: {
      fontSize: "31px",
      color: colors.blackWhiteBlack,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "20px",
      color: colors.blackWhiteBlack,
      fontWeight: 700,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 700,
    },
  },
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
  },
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 300,
  //     md: 660,
  //     lg: 855,
  //     xl: 1296,
  //   },
  // },
  components: {
    MuiCssBaseline: {},
    MuiContainer: {
      styleOverrides: {
        root: {},
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: "0px",
          paddingRight: "0px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          height: "5.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#000",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "32px",
          height: "40px",
          padding: "10px 24px",
          fontSize: "16px",
          fontWeight: 700,
          textTransform: "capitalize",
          lineHeight: "100%",
          alignItems: "center",
          color: colors.primary.light,
          "&:hover": {
            boxShadow: "none",
          },
          [`&.${buttonClasses.disabled}`]: {
            backgroundColor: "#F5F8FA",
            color: "rgba(0, 0, 0, 0.30)",
            cursor: "not-allowed",
            pointerEvents: "auto",
          },
        },
        contained: {
          backgroundColor: colors.primary.main,
          "&:hover": {
            backgroundColor: colors.primary.dark,
          },
        },
        outlined: {
          borderColor: "#DCDFE3",
          color: colors.black,
          "&:hover": {
            borderColor: "#DCDFE3",
            backgroundColor: "rgba(17, 82, 147, 0.1)",
          },
        },
        text: {
          color: "#1976d2",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.1)",
          },
        },
        startIcon: {
          marginRight: "12px",
        },
        endIcon: {
          marginLeft: "12px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            padding: "18px 12px",
            borderRadius: "0.75rem",
            fontSize: "16px",
            fontWeight: 400,
          },
          "& .MuiOutlinedInput-root": {
            padding: "0px 12px",
            "& fieldset": {
              borderColor: colors.gray[200],
            },
            "&:hover fieldset": {
              borderColor: colors.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary.main,
              border: "1px solid primary.main",
            },
          },
          "& .MuiInputBase-input": {
            fontSize: "16px",
            fontWeight: 400,
          },
          "& .MuiInputBase-input::placeholder": {
            color: colors.gray[500],
            fontSize: "16px",
            fontWeight: 400,
            opacity: 1,
          },
          // "& .MuiInputLabel-root": {
          //   fontSize: "14px",
          //   color: "#777",
          //   "&.Mui-focused": {
          //     color: colors.primary.main,
          //   },
          // },
        },
      },
    },
  },
};

const theme = responsiveFontSizes(createTheme(options));

export default theme;
