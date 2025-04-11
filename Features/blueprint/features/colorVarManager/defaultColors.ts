import { ColorVar } from "../blockManager/type";
const defaultColor: ColorVar = {
  background: {
    default: "#fff",
  },
  text: {
    primary: "#000000de",
    secondary: "#00000099",
    disabled: "#00000061",
    hint: "#22194D",
  },
  primary: {
    main: "#3f51b5",
    light: "#6573c3",
    dark: "#2C387E",
    contrastText: "#fff",
  },
  secondary: {
    main: "#9C27B0",
    light: "#AF52BF",
    dark: "#6D1B7B",
    contrastText: "#fff",
  },
  error: {
    main: "#D32F2F",
    light: "#EF5350",
    dark: "#C62828",
    contrastText: "#fff",
  },
  warning: {
    main: "#ED6C02",
    light: "##FF9800",
    dark: "#E65100",
    contrastText: "#fff",
  },
  info: {
    main: "#0288D1",
    light: "#03A9F4",
    dark: "#01579B",
    contrastText: "#fff",
  },
  success: {
    main: "#2E7D32",
    light: "#4CAF50",
    dark: "#1B5E20",
    contrastText: "#fff",
  },
  divider: {
    divider: "#0000001f",
  },
};
const strictKeys = new Set([
  "default",
  "primary",
  "secondary",
  "disabled",
  "hint",
  "main",
  "divider",
]);
export { defaultColor, strictKeys };
