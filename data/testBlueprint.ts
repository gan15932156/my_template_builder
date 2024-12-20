export const blueprintEditorData1 = {
  id: "1",
  name: "landing page1",
  category: "landing page",
  dragElementType: 0,
  element: {
    id: "1",
    category: "container",
    dragElementType: 1,
    tag: ["div", "section", "main"],
    accept: ["*"],
    elmType: "container",
    attribute: { id: "id1", class: "class1" },
    content: [
      {
        id: "newd1",
        isShowElm: false,
        dragElementType: 0,
        refId: "d1",
        isUseRef: true,
      },
      {
        id: "newd2",
        isShowElm: false,
        category: "button",
        dragElementType: 1,
        tag: ["button"],
        accept: ["text"],
        elmType: "button",
        content: "Button",
      },
    ],
  },
};
export const dragEditorData1 = {
  id: "d1",
  name: "Outline button",
  category: "button",
  dragElementType: 0,
  styles: [
    {
      selector: ["#b1"],
      style: {
        "background-color": "blue",
        padding: "0.4rem",
        border: "none",
        "border-radius": "2rem",
      },
    },
    {
      selector: ["#b1"],
      state: "hover",
      style: {
        color: "yellow",
      },
    },
  ],
  element: {
    id: "1",
    category: "button",
    elmType: "button",
    tag: ["button"],
    accept: ["text"],
    attribute: { id: "b1", class: "outline_button1" },
    content: "Button",
  },
};
export const dragEditorData2 = {
  id: "d2",
  name: "Button",
  category: "button",
  dragElementType: 1,
  element: {
    id: "2",
    category: "button",
    tag: ["button"],
    accept: ["text"],
    elmType: "button",
    content: "Button",
  },
};
