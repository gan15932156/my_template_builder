export type TagSet = Set<string>;
type DragRules = {
  tag: TagSet;
  accept: TagSet;
  attributes?: { [key: string]: string[] };
  defaultTag: string;
};
const ACCEPT_ALL = "*";
const boxTag: TagSet = new Set([
  "div",
  "section",
  "main",
  "footer",
  "nav",
  "header",
]);
const boxAccept: TagSet = new Set([ACCEPT_ALL]);
const textTag: TagSet = new Set(["span", "p", "h1", "h2", "h3", "h4", "h5"]);
const textAccept: TagSet = new Set([]);
const linkTag: TagSet = new Set([]);
const linkAccept: TagSet = new Set([]);
const formTag: TagSet = new Set([]);
const formAccept: TagSet = new Set([ACCEPT_ALL]);
const buttonTag: TagSet = new Set([]);
const buttonAccept: TagSet = new Set([]);
const imageTag: TagSet = new Set([]);
const imageAccept: TagSet = new Set([]);
const selectTag: TagSet = new Set([]);
const selectAccept: TagSet = new Set([]);
const inputTag: TagSet = new Set([]);
const inputAccept: TagSet = new Set([]);
const inputAttr: { [key: string]: string[] } = {
  type: ["text", "password", "email", "radio", "checkbox"],
};
const labelTag: TagSet = new Set([]);
const labelAccept: TagSet = new Set([]);
const dragElementRule: Record<string, DragRules> = {
  box: { tag: boxTag, accept: boxAccept, defaultTag: "div" },
  form: { tag: formTag, accept: formAccept, defaultTag: "form" },
  button: { tag: buttonTag, accept: buttonAccept, defaultTag: "button" },
  image: { tag: imageTag, accept: imageAccept, defaultTag: "img" },
  text: { tag: textTag, accept: textAccept, defaultTag: "h5" },
  link: { tag: linkTag, accept: linkAccept, defaultTag: "a" },
  label: { tag: labelTag, accept: labelAccept, defaultTag: "label" },
  select: { tag: selectTag, accept: selectAccept, defaultTag: "select" },
  input: {
    tag: inputTag,
    accept: inputAccept,
    attributes: inputAttr,
    defaultTag: "input",
  },
};
const flatternElementTags = new Set([
  ...textTag,
  dragElementRule.button.defaultTag,
  dragElementRule.image.defaultTag,
  dragElementRule.link.defaultTag,
  dragElementRule.label.defaultTag,
  dragElementRule.select.defaultTag,
  dragElementRule.input.defaultTag,
]);
export { dragElementRule, ACCEPT_ALL, flatternElementTags };
