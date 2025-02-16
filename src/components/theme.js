import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f4a226", // Base color
    },
    secondary: {
      main: "#76c7ad",
    },
    background: {
      default: "#f9f9f9",
    },
    text: {
      primary: "#333",
      secondary: "#5a3e2b",
    },
  },
  typography: {
    fontFamily: "Quicksand, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "#5a3e2b",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#5a3e2b",
    },
  },
});

export default theme;
