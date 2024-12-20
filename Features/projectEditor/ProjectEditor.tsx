"use client";
import { useEffect, useMemo, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import styles from "./ProjectEditor.module.css";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formBlockPlugin from "grapesjs-plugin-forms";
import {
  blockManager,
  deviceManager,
  initConfigGjs,
  layerManager,
  panels,
  selectorManager,
  traitManager,
} from "@/config/gjs-config";
import { templateBlock } from "@/plugins/block-template";
import { styleManager } from "@/config/gjs-style-manager-config";
import InfoField from "./InfoField";
import { update } from "./utils";
import { additionStyle } from "@/plugins/additionStyle";
import { randomElement } from "@/plugins/randomPlugin";
interface Props {
  projectId: string;
}
const ProjectEditor: React.FC<Props> = ({ projectId }) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  // https://fontawesome.com/v4/icons/
  const storageApiPath = useMemo(
    () => `/api/project/${projectId}`,
    [projectId]
  );
  const assetApiPath = useMemo(
    () => `/api/editor/${projectId}/media`,
    [projectId]
  );
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
            onStore: (data) => ({ id: projectId, data }),
            onLoad: (result) => {
              // can check result is exist before set project data
              if (Object.keys(result.data).length > 0) {
                const projectData = {
                  ...result.data,
                  assets: [
                    ...result.data.assets,
                    "https://placehold.co/600x400",
                  ],
                };
                return projectData;
              } else {
                return {
                  pages: [{}],
                  assets: ["https://placehold.co/600x400"],
                };
              }
            },
          },
        },
      },
      assetManager: {
        uploadFile: async (ev: DragEvent | Event) => {
          let files: FileList | null = null;

          // Handle DragEvent (drag-and-drop) or File Input Event
          if ("dataTransfer" in ev && ev.dataTransfer) {
            files = ev.dataTransfer.files;
          } else if (ev.target && (ev.target as HTMLInputElement).files) {
            files = (ev.target as HTMLInputElement).files;
          }

          // If files are found, prepare FormData and send to API
          if (files) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
              formData.append("files", file); // Append each file to FormData
            });

            try {
              // Send the FormData to the /api/uploadImage route
              const res = await fetch(assetApiPath, {
                method: "POST",
                body: formData,
              });

              // Handle response (assuming the API returns JSON)
              const data = await res.json();
              if (data.success) {
                editorInstance.AssetManager.add(data.data);
              } else {
                console.error("Error during upload:", data.message);
              }
            } catch (error) {
              console.error("Error during upload:", error);
            }
          } else {
            console.error("No files found");
          }
        },
      },
      blockManager: blockManager,
      layerManager: layerManager,
      styleManager: styleManager,
      selectorManager: selectorManager,
      deviceManager: deviceManager,
      traitManager: traitManager,
      panels: panels,
      plugins: [
        (editor) => basicBlockPlugin(editor, {}),
        (editor) => formBlockPlugin(editor, {}),
        (editor) => templateBlock(editor),
        (editor) => additionStyle(editor),
        (editor) => randomElement(editor),
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
          async command(editor: Editor) {
            const projectData = editor.getProjectData();
            console.log(projectData);
            // const iframe = document.querySelector(
            //   ".gjs-frame"
            // ) as unknown as HTMLIFrameElement;
            // const res = await update(iframe, projectId, projectData);
            // editor.loadProjectData(res.data);
          },
        },
        {
          id: "export",
          attributes: { class: "fa fa-upload", title: "Export" },
          command(editor: Editor) {
            const pagesHtml = editor.Pages.getAll().map((page) => {
              const component = page.getMainComponent();
              // avoidProtected: true is mean don't include css reset like *{margin:0}
              return {
                html: editor.getHtml({ component }),
                css: editor.getCss({ component, avoidProtected: true }),
              };
            });
            console.log(pagesHtml);
          },
        },
      ],
    });
    editorInstance.on("asset:remove", async (asset) => {
      const regex = /nextjs_uploads\/([^\.]+)/;
      const imageSrc = asset.attributes.src;
      const match = imageSrc.match(regex);
      if (match && match[1]) {
        const result = `nextjs_uploads/${match[1]}`;
        try {
          await fetch(assetApiPath, {
            method: "DELETE",
            body: JSON.stringify({ publicId: result }),
          });
        } catch (error) {
          console.error("Error during delete image:", error);
        }
      }
      // call save function
    });
    setEditor(editorInstance);
    return () => {
      editorInstance.destroy();
      setEditor(null);
    };
  }, [projectId]);
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
            <InfoField id={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
