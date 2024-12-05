"use client";
import grapesjs, { Editor as EditorType } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useEffect, useMemo, useState } from "react";
import styles from "./Editor.module.css";
import {
  blockManager,
  deviceManager,
  initConfigGjs,
  layerManager,
  panels,
  selectorManager,
  traitManager,
} from "@/config/gjs-config";
import { styleManager } from "@/config/gjs-style-manager-config";
import { templateBlock } from "@/plugins/block-template";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formBlockPlugin from "grapesjs-plugin-forms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TcomponentBody } from "@/zodObject";
import InfoField from "./InfoField";
interface Props {
  id: string;
}
const Editor: React.FC<Props> = ({ id }) => {
  const [editor, setEditor] = useState<EditorType | null>(null);
  const storageApiPath = useMemo(() => `/api/component/${id}`, [id]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (body: TcomponentBody) => {
      const response = await fetch(storageApiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const text = await response.text();
        try {
          const error = JSON.parse(text);
          throw new Error(error.message || "Failed to update component");
        } catch {
          throw new Error(text || "Failed to update component");
        }
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["componentBody"] });
    },
    onError: (error: unknown) => {
      console.error("Error updating component:", error);
    },
  });
  useEffect(() => {
    const editorInstance = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      width: "auto",
      height: "100%",
      storageManager: {
        autosave: false,
        type: "remote",
        options: {
          remote: {
            urlLoad: storageApiPath,
            urlStore: storageApiPath,
            // https://github.com/GrapesJS/grapesjs/issues/2763
            // https://grapesjs.com/docs/modules/Storage.html#common-use-cases
            onStore: (data) => ({ id, data }),
            onLoad: (result) => {
              if (result.data) {
                return {
                  pages: [
                    {
                      component: `
                      <body>${result.data.html}</body>
                      <style>${result.data.css}</style>
                    `,
                    },
                  ],
                  assets: ["https://placehold.co/600x400"],
                };
              } else {
                return {};
              }
            },
          },
        },
      },
      assetManager: {
        upload: false,
        showUrlInput: false,
        dropzone: false,
      },
      blockManager: blockManager,
      layerManager: layerManager,
      styleManager: styleManager,
      selectorManager: selectorManager,
      deviceManager: deviceManager,
      traitManager: traitManager,
      panels: panels,
      plugins: [
        (editor) => templateBlock(editor),
        (editor) => basicBlockPlugin(editor, {}),
        (editor) => formBlockPlugin(editor, {}),
      ],
    });
    initConfigGjs(editorInstance);
    editorInstance.Panels.addPanel({
      id: "panel__basic__right",
      el: "#panel__basic__right",
      buttons: [
        {
          id: "save",
          attributes: { class: "fa fa-floppy-o", title: "Save" },
          async command(editor: EditorType) {
            const component = editor.Pages.getSelected()?.getMainComponent();
            if (component) {
              const fullHTML = component.toHTML();
              const cleanedHTML = fullHTML.replace(/<\/?body>/g, "");
              const fullCSS = editor.getCss({
                component,
                avoidProtected: true,
              });
              await mutation.mutateAsync({
                html: cleanedHTML,
                css: fullCSS || "",
              });
            }
          },
        },
      ],
    });
    setEditor(editorInstance);

    return () => {
      editorInstance.destroy();
      setEditor(null);
    };
  }, [id]);
  return (
    <div className={styles.container}>
      <div id="panel__top" className={styles.panel__top}>
        <div
          id="panel__basic__actions"
          className={styles.panel__basic__actions}
        >
          <div
            id="panel__basic__left"
            className={styles.panel__basic__left}
          ></div>
          <div
            id="panel__basic__middle"
            className={styles.panel__basic__middle}
          ></div>
          <div
            id="panel__basic__right"
            className={styles.panel__basic__right}
          ></div>
        </div>
        <div
          className={styles.panel__device_manager}
          id="panel__device_manager"
        ></div>
        <div id="panel__switcher" className={styles.panel__switcher}></div>
      </div>
      <div id="editor__row" className={styles.editor__row}>
        <div id="editor__canvas" className={styles.editor__canvas}>
          <div id="gjs"></div>
        </div>
        <div id="panel__right" className={styles.panel__right}>
          <div className="layers-container"></div>
          <div className="styles-container">
            <div className="traits-container"></div>
            <div className="selector-container"></div>
          </div>
          <div className="blocks-container"></div>
          <div className="settings-container">
            <InfoField id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
