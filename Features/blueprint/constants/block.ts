import { HashMap, TBasicBlock } from "../features/blockManager/type";
const basicBlocks: HashMap<TBasicBlock> = {};

basicBlocks["basicText"] = {
  id: "basicText",
  icon: "FiType",
  name: "Text",
  category: "basic",
  isBlueprint: false,
  element: {
    elmType: "text",
    content: "Text here!",
  },
};
basicBlocks["basicParagraph"] = {
  id: "basicParagraph",
  icon: "FiAlignLeft",
  name: "Paragraph",
  category: "basic",
  isBlueprint: false,
  element: {
    elmType: "paragraph",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel tellus massa. Morbi a mi sit amet massa viverra lacinia. Sed scelerisque consequat felis mollis molestie. Suspendisse potenti. Quisque lobortis imperdiet elit non bibendum.",
  },
};
basicBlocks["basicBox"] = {
  id: "basicBox",
  icon: "FiBox",
  name: "Box",
  category: "basic",
  isBlueprint: false,
  styles: {
    normal: { padding: "1rem" },
  },
  element: {
    elmType: "box",
    content: [],
  },
};
basicBlocks["basicButton"] = {
  id: "basicButton",
  icon: "FiCreditCard",
  name: "Button",
  category: "basic",
  isBlueprint: false,
  element: {
    elmType: "button",
    content: "Click me!",
  },
};
basicBlocks["basicLink"] = {
  id: "basicLink",
  icon: "FiExternalLink",
  name: "Link",
  category: "basic",
  isBlueprint: false,
  element: {
    elmType: "link",
    content: "Click me!",
    attributes: {
      href: "#",
    },
  },
};
basicBlocks["basicImage"] = {
  id: "basicImage",
  icon: "FiImage",
  name: "Image",
  category: "basic",
  isBlueprint: false,
  element: {
    elmType: "image",
    content: "",
    attributes: {
      src: "https://placehold.co/600x400",
      alt: "Image",
    },
  },
};
const inputBlocks: HashMap<TBasicBlock> = {};
inputBlocks["formInput"] = {
  id: "formInput",
  name: "Form",
  category: "input",
  isBlueprint: false,
  element: {
    elmType: "form",
    content: [],
  },
};
inputBlocks["labelInput"] = {
  id: "labelInput",
  name: "Label",
  category: "input",
  isBlueprint: false,
  element: {
    elmType: "label",
    content: "",
  },
};
inputBlocks["textInput"] = {
  id: "textInput",
  name: "Text",
  category: "input",
  isBlueprint: false,
  element: {
    elmType: "input",
    content: "",
    attributes: {
      type: "text",
      placeholder: "input here",
      name: "someName",
    },
  },
};
inputBlocks["checkboxInput"] = {
  id: "checkboxInput",
  name: "Checkbox",
  category: "input",
  isBlueprint: false,
  element: {
    elmType: "input",
    content: "",
    attributes: {
      type: "checkbox",
      name: "someName",
      value: "someValue",
    },
  },
};
inputBlocks["radioInput"] = {
  id: "radioInput",
  name: "Radio",
  category: "input",
  isBlueprint: false,
  element: {
    elmType: "input",
    content: "",
    attributes: {
      type: "radio",
      name: "someName",
      value: "someValue",
    },
  },
};
inputBlocks["selectInput"] = {
  id: "selectInput",
  name: "Select",
  category: "input",
  isBlueprint: false,
  element: {
    elmType: "select",
    content: "",
    attributes: {
      options: ["option1", "option2"],
    },
  },
};

const blockCategories: HashMap<HashMap<TBasicBlock>> = {};
blockCategories["basic"] = basicBlocks;
blockCategories["input"] = inputBlocks;

export { blockCategories };
