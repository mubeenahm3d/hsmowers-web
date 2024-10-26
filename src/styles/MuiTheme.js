import { createTheme } from "@mui/material";

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: "#252E3F", // Green
    },
    secondary: {
      main: "#ff0000", // Red
    },
    text: {
      primary: "#252E3F", // Blue
      secondary: "white", // White
      disabled: "#cccccc", // Light Gray
    },
  },
});

export default MuiTheme;
