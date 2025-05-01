export const ID_LENGTH = 12;
export const CUSTOM_ALPHABET = "asdjgghfgbfdf";
export const PER_PAGE_SIZE = 4;
export const ELM_TYPES = [
  "base",
  "box",
  "text",
  "button",
  "link",
  "image",
  "label",
  "input",
  "select",
  "form",
] as const;

export type TElmType = (typeof ELM_TYPES)[number];

export const STYLE_STATE = [
  "normal",
  "hover",
  "click",
  "active",
  "link",
] as const;

export type TStyleState = (typeof STYLE_STATE)[number];
