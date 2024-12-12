import { Editor } from "grapesjs";

export const additionStyle = (editor: Editor) => {
  const styleManager = editor.StyleManager;
  styleManager.addSector("addition", {
    name: "Addition",
    open: false,
    properties: [
      {
        type: "select",
        property: "object-fit",
        label: "Object-fit",
        default: "initial",
        options: [
          { id: "contain", label: "Contain" },
          { id: "cover", label: "Cover" },
          { id: "fill", label: "Fill" },
          { id: "none", label: "None" },
          { id: "scale-down", label: "Scale-down" },
          { id: "inherit", label: "Inherit" },
          { id: "initial", label: "Initial" },
          { id: "unset", label: "Unset" },
        ],
      },
    ],
  });
};
