import {
  BlockManagerConfig,
  DeviceManagerConfig,
  Editor,
  LayerManagerConfig,
  PanelsConfig,
  SelectorManagerConfig,
  StyleManagerConfig,
  TraitManagerConfig,
} from "grapesjs";
export const layerManager: LayerManagerConfig = {
  appendTo: ".layers-container",
};
export const blockManager: BlockManagerConfig = {
  appendTo: ".blocks-container",
};
export const selectorManager: SelectorManagerConfig = {
  appendTo: ".selector-container",
};
export const traitManager: TraitManagerConfig = {
  appendTo: ".traits-container",
};
export const styleManager: StyleManagerConfig = {
  appendTo: ".styles-container",
  sectors: [
    {
      name: "General",
      properties: [
        {
          extend: "float",
          type: "radio",
          default: "none",
          options: [
            { id: "none", value: "none", label: "None" },
            { id: "left", value: "left", label: "Left" },
            { id: "right", value: "right", label: "Right" },
          ],
        },
        "display",
        { extend: "position", type: "select" },
        "top",
        "right",
        "left",
        "bottom",
      ],
    },
    {
      name: "Dimension",
      open: false,
      properties: [
        "width",
        {
          id: "flex-width",
          type: "integer",
          name: "Width",
          units: ["px", "%"],
          property: "flex-basis",
        },
        "height",
        "max-width",
        "min-height",
        "margin",
        "padding",
      ],
    },
    {
      name: "Typography",
      open: false,
      properties: [
        "font-family",
        "font-size",
        "font-weight",
        "letter-spacing",
        "color",
        "line-height",
        {
          extend: "text-align",
          options: [
            { id: "left", label: "Left" },
            { id: "center", label: "Center" },
            { id: "right", label: "Right" },
            {
              id: "justify",
              label: "Justify",
            },
          ],
        },
        {
          property: "text-decoration",
          type: "radio",
          default: "none",
          options: [
            { id: "none", label: "None", className: "fa fa-times" },
            {
              id: "underline",
              label: "underline",
            },
            {
              id: "line-through",
              label: "Line-through",
            },
          ],
        },
        "text-shadow",
      ],
    },
    {
      name: "Decorations",
      open: false,
      properties: [
        "opacity",
        "border-radius",
        "border",
        "box-shadow",
        "background", // { id: 'background-bg', property: 'background', type: 'bg' }
      ],
    },
    {
      name: "Extra",
      open: false,
      buildProps: ["transition", "perspective", "transform"],
    },
    {
      name: "Flex",
      open: false,
      properties: [
        {
          name: "Flex Container",
          property: "display",
          type: "select",
          defaults: "block",
          list: [
            { id: "block", value: "block", name: "Disable" },
            { id: "flex", value: "flex", name: "Enable" },
          ],
        },
        {
          name: "Flex Parent",
          property: "label-parent-flex",
          type: "integer",
        },
        {
          name: "Direction",
          property: "flex-direction",
          type: "radio",
          defaults: "row",
          list: [
            { id: "row", value: "row", name: "Row", title: "Row" },
            {
              id: "row-reverse",
              value: "row-reverse",
              name: "Row reverse",
              title: "Row reverse",
            },
            {
              id: "column",
              value: "column",
              name: "Column",
              title: "Column",
            },
            {
              id: "column-reverse",
              value: "column-reverse",
              name: "Column reverse",
              title: "Column reverse",
            },
          ],
        },
        {
          name: "Justify",
          property: "justify-content",
          type: "radio",
          defaults: "flex-start",
          list: [
            { id: "flex-start", value: "flex-start", title: "Start" },
            { id: "flex-end", value: "flex-end", title: "End" },
            {
              id: "space-between",
              value: "space-between",
              title: "Space between",
            },
            {
              id: "space-around",
              value: "space-around",
              title: "Space around",
            },
            { id: "center", value: "center", title: "Center" },
          ],
        },
        {
          name: "Align",
          property: "align-items",
          type: "radio",
          defaults: "center",
          list: [
            { id: "flex-start", value: "flex-start", title: "Start" },
            { id: "flex-end", value: "flex-end", title: "End" },
            { id: "stretch", value: "stretch", title: "Stretch" },
            { id: "center", value: "center", title: "Center" },
          ],
        },
        {
          name: "Flex Children",
          property: "label-parent-flex",
          type: "integer",
        },
        {
          name: "Order",
          property: "order",
          type: "integer",
          defaults: "0",
          min: 0,
        },
        {
          name: "Flex",
          property: "flex",
          type: "composite",
          properties: [
            {
              name: "Grow",
              property: "flex-grow",
              type: "integer",
              defaults: "0",
              min: 0,
            },
            {
              name: "Shrink",
              property: "flex-shrink",
              type: "integer",
              defaults: "0",
              min: 0,
            },
            {
              name: "Basis",
              property: "flex-basis",
              type: "integer",
              units: ["px", "%", ""],
              unit: "",
              defaults: "auto",
            },
          ],
        },
        {
          name: "Align",
          property: "align-self",
          type: "radio",
          defaults: "auto",
          list: [
            { id: "auto", value: "auto", name: "Auto" },
            { id: "flex-start", value: "flex-start", title: "Start" },
            { id: "flex-end", value: "flex-end", title: "End" },
            { id: "stretch", value: "stretch", title: "Stretch" },
            { id: "center", value: "center", title: "Center" },
          ],
        },
      ],
    },
  ],
};
export const panels: PanelsConfig = {
  defaults: [
    {
      id: "layers",
      el: "#panel__right",
    },
    { id: "panel-top", el: "#panel__top" },
    { id: "basic-actions", el: "#panel__basic__actions" },
    {
      id: "panel-switcher",
      el: "#panel__switcher",
      buttons: [
        {
          id: "show-blocks",
          active: true,
          label:
            "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'><path d='M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm0 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Zm12 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2Zm0-12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2Z' /><path fill-rule='evenodd' d='M10 6.5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1ZM10 18a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-4-4a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm12 0a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Z'/></svg>",
          command: "show-blocks",
          // Once activated disable the possibility to turn it off
          togglable: false,
          attributes: { title: "Block panel" },
        },
        {
          id: "show-layers",
          active: true,
          label:
            "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'><path d='M5.005 10.19a1 1 0 0 1 1 1v.233l5.998 3.464L18 11.423v-.232a1 1 0 1 1 2 0V12a1 1 0 0 1-.5.866l-6.997 4.042a1 1 0 0 1-1 0l-6.998-4.042a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1ZM5 15.15a1 1 0 0 1 1 1v.232l5.997 3.464 5.998-3.464v-.232a1 1 0 1 1 2 0v.81a1 1 0 0 1-.5.865l-6.998 4.042a1 1 0 0 1-1 0L4.5 17.824a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1Z' /><path d='M12.503 2.134a1 1 0 0 0-1 0L4.501 6.17A1 1 0 0 0 4.5 7.902l7.002 4.047a1 1 0 0 0 1 0l6.998-4.04a1 1 0 0 0 0-1.732l-6.997-4.042Z'/></svg>",
          command: "show-layers",
          // Once activated disable the possibility to turn it off
          togglable: false,
          attributes: { title: "Layer panel" },
        },
        {
          id: "show-style",
          active: true,
          label:
            "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 7h.01m3.486 1.513h.01m-6.978 0h.01M6.99 12H7m9 4h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 3.043 12.89 9.1 9.1 0 0 0 8.2 20.1a8.62 8.62 0 0 0 3.769.9 2.013 2.013 0 0 0 2.03-2v-.857A2.036 2.036 0 0 1 16 16Z'/></svg>",
          command: "show-styles",
          togglable: false,
          attributes: { title: "Style panel" },
        },
        {
          id: "show-traits",
          active: true,
          label:
            "<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 7h.01m3.486 1.513h.01m-6.978 0h.01M6.99 12H7m9 4h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 3.043 12.89 9.1 9.1 0 0 0 8.2 20.1a8.62 8.62 0 0 0 3.769.9 2.013 2.013 0 0 0 2.03-2v-.857A2.036 2.036 0 0 1 16 16Z'/></svg>",
          command: "show-traits",
          togglable: false,
          attributes: { title: "Trait panel" },
        },
      ],
    },
    {
      id: "panel__device_manager",
      el: "#panel__device_manager",
      buttons: [
        {
          id: "device-desktop",
          attributes: { class: "fa fa-desktop", title: "Set desktop view" },
          command: "set-device-desktop",
          active: true,
          togglable: false,
        },
        {
          id: "device-tablet",
          attributes: { class: "fa fa-tablet", title: "Set tablet view" },
          command: "set-device-tablet",
          togglable: false,
        },
        {
          id: "device-mobile",
          attributes: { class: "fa fa-mobile", title: "Set mobile view" },
          command: "set-device-mobile",
          togglable: false,
        },
      ],
    },
  ],
};
export const deviceManager: DeviceManagerConfig = {
  devices: [
    { id: "desktop", name: "Desktop", width: "" },
    {
      id: "tablet",
      name: "Tablet",
      width: "800px", // This width will be applied on the canvas frame
      widthMedia: "810px", // This width that will be used for the CSS media
      height: "600px", // Height will be applied on the canvas frame
    },
    { id: "mobile", name: "Mobile", width: "320px", widthMedia: "480px" },
  ],
};
export const initConfigGjs = (editor: Editor) => {
  const gjs_panel = editor.Panels;
  const gjs_command = editor.Commands;
  gjs_panel.addPanel({
    id: "panel__basic__middle",
    el: "#panel__basic__middle",
    buttons: [
      {
        id: "undo",
        attributes: { class: "fa fa-undo", title: "Undo" },
        command: function (
          editor: { UndoManager: { undo: (arg0: number) => void } },
          sender: { set: (arg0: string, arg1: number) => void }
        ) {
          editor.UndoManager.undo(1);
          sender.set("active", 0);
        },
      },
      {
        id: "redo",
        attributes: { class: "fa fa-repeat", title: "Redo" },
        command: function (
          editor: { UndoManager: { redo: (arg0: number) => void } },
          sender: { set: (arg0: string, arg1: number) => void }
        ) {
          editor.UndoManager.redo(1);
          sender.set("active", 0);
        },
      },
    ],
  });
  gjs_panel.addPanel({
    id: "panel__basic__left",
    el: "#panel__basic__left",
    buttons: [
      {
        id: "preview_mode",
        attributes: { class: "fa fa-eye", title: "Toggle preview mode" },
        command: "preview", // Built-in command
      },
      {
        id: "visibility",
        active: true,
        attributes: { class: "fa fa-columns", title: "Toggle visibility" },
        command: "sw-visibility", // Built-in command
      },
      {
        id: "export",
        attributes: { class: "fa fa-code", title: "Toggle export template" },
        command: "export-template",
        context: "export-template", // For grouping context of buttons from the same panel
      },
    ],
  });
  gjs_command.add("show-blocks", {
    getRowEl(editor: any) {
      return editor.getContainer().closest("#editor__row");
    },
    getLayersEl(row: { querySelector: (arg0: string) => any }) {
      return row.querySelector(".blocks-container");
    },
    run(editor: any, sender: any) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = "";
    },
    stop(editor: any, sender: any) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = "none";
    },
  });
  gjs_command.add("show-layers", {
    getRowEl(editor: any) {
      return editor.getContainer().closest("#editor__row");
    },
    getLayersEl(row: { querySelector: (arg0: string) => any }) {
      return row.querySelector(".layers-container");
    },

    run(editor: any, sender: any) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = "";
    },
    stop(editor: any, sender: any) {
      const lmEl = this.getLayersEl(this.getRowEl(editor));
      lmEl.style.display = "none";
    },
  });
  gjs_command.add("show-styles", {
    getRowEl(editor: any) {
      return editor.getContainer().closest("#editor__row");
    },
    getStyleEl(row: { querySelector: (arg0: string) => any }) {
      return row.querySelector(".styles-container");
    },

    run(editor: any, sender: any) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "";
    },
    stop(editor: any, sender: any) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "none";
    },
  });
  gjs_command.add("show-traits", {
    getRowEl(editor: any) {
      return editor.getContainer().closest("#editor__row");
    },
    getStyleEl(row: { querySelector: (arg0: string) => any }) {
      return row.querySelector(".traits-container");
    },

    run(editor: any, sender: any) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "";
    },
    stop(editor: any, sender: any) {
      const smEl = this.getStyleEl(this.getRowEl(editor));
      smEl.style.display = "none";
    },
  });
  gjs_command.add("set-device-desktop", {
    run: (editor) => editor.setDevice("Desktop"),
  });
  gjs_command.add("set-device-tablet", {
    run: (editor) => editor.setDevice("Tablet"),
  });
  gjs_command.add("set-device-mobile", {
    run: (editor) => editor.setDevice("Mobile"),
  });

  // event
};
