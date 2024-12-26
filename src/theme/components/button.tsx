import { Components, Theme } from "@mui/material/styles";

const ButtonTheme = (theme: Theme): Components["MuiButton"] => ({
  styleOverrides: {
    root: {
      borderRadius: 8,
      textTransform: "none",
      padding: "8px 16px",
      fontWeight: "bold",
    },
    containedPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
});

export default ButtonTheme;
