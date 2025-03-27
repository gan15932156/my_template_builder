type TagSet = Set<string>;
type DragRules = {
  tag: TagSet;
  accept: TagSet;
  attributes?: { [key: string]: string[] };
  defaultTag: string;
};
const ACCEPT_ALL = "*";
const boxTag: TagSet = new Set(["div", "section"]);
const boxAccept: TagSet = new Set([ACCEPT_ALL]);
const textTag: TagSet = new Set(["span", "h1", "h2", "h3"]);
const textAccept: TagSet = new Set([]);
const formTag: TagSet = new Set([]);
const formAccept: TagSet = new Set([ACCEPT_ALL]);
const buttonTag: TagSet = new Set([]);
const buttonAccept: TagSet = new Set([]);
const imageTag: TagSet = new Set([]);
const imageAccept: TagSet = new Set([]);
const inputTag: TagSet = new Set([]);
const inputAccept: TagSet = new Set([]);
const inputAttr: { [key: string]: string[] } = {
  type: ["text", "password", "email", "radio", "checkbox"],
};
const dragElementRule: Record<string, DragRules> = {
  box: { tag: boxTag, accept: boxAccept, defaultTag: "div" },
  form: { tag: formTag, accept: formAccept, defaultTag: "form" },
  button: { tag: buttonTag, accept: buttonAccept, defaultTag: "button" },
  iamge: { tag: imageTag, accept: imageAccept, defaultTag: "img" },
  text: { tag: textTag, accept: textAccept, defaultTag: "span" },
  input: {
    tag: inputTag,
    accept: inputAccept,
    attributes: inputAttr,
    defaultTag: "input",
  },
};
export { dragElementRule, ACCEPT_ALL };
