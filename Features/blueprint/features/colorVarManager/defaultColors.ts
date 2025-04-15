import { ColorVar } from "../blockManager/type";
const defaultColor: ColorVar = {
  background: {
    default: "#F1F1F1",
  },
  text: {
    primary: "#1c1c1c",
    secondary: "#5b5b5b",
    disabled: "#979797",
    hint: "#22194D",
  },
  primary: {
    main: "#3f51b5",
    light: "#6573c3",
    dark: "#2C387E",
    contrastText: "#F1F1F1",
  },
  secondary: {
    main: "#9C27B0",
    light: "#AF52BF",
    dark: "#6D1B7B",
    contrastText: "#F1F1F1",
  },
  error: {
    main: "#D32F2F",
    light: "#EF5350",
    dark: "#C62828",
    contrastText: "#F1F1F1",
  },
  warning: {
    main: "#ED6C02",
    light: "#FF9800",
    dark: "#E65100",
    contrastText: "#F1F1F1",
  },
  info: {
    main: "#0288D1",
    light: "#03A9F4",
    dark: "#01579B",
    contrastText: "#F1F1F1",
  },
  success: {
    main: "#2E7D32",
    light: "#4CAF50",
    dark: "#1B5E20",
    contrastText: "#F1F1F1",
  },
  divider: {
    divider: "#00001f",
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
