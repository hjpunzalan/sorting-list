import { Colours } from "@/constants/colours";
import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  typography: {
    fontFamily: "PT Mono",
    h1: {
      fontFamily: "Bebas Neue"
    }
  },
  palette: {
    action: {
      disabled: "rgba(255,255,255,0.4)"
    },
    primary: {
      main: Colours.VividGreenCyan
    },
    secondary: {
      main: Colours.PalePink
    },
    background: {
      default: Colours.White
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "grey"
          }
        }
      }
    }
  }
});
