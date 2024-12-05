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
          command: "show-blocks",
          // Once activated disable the possibility to turn it off
          togglable: false,
          attributes: { class: "fa fa-th-large", title: "Block panel" },
        },
        {
          id: "show-layers",
          active: true,

          command: "show-layers",
          // Once activated disable the possibility to turn it off
          togglable: false,
          attributes: { class: "fa fa-bars", title: "Layer panel" },
        },
        {
          id: "show-style",
          active: true,
          command: "show-styles",
          togglable: false,
          attributes: { class: "fa fa-tachometer", title: "Style panel" },
        },
        {
          id: "show-setting",
          active: true,
          command: "show-setting",
          togglable: false,
          attributes: { class: "fa fa-cog", title: "Setting panel" },
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
  gjs_command.add("show-setting", {
    getRowEl(editor: any) {
      return editor.getContainer().closest("#editor__row");
    },
    getStyleEl(row: { querySelector: (arg0: string) => any }) {
      return row.querySelector(".settings-container");
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
};
