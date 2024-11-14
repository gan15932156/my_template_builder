"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import styles from "../editor/styles.module.css";
import basicBlockPlugin from "grapesjs-blocks-basic";
import formBlockPlugin from "grapesjs-plugin-forms";
import {
  blockManager,
  deviceManager,
  initConfigGjs,
  layerManager,
  panels,
  selectorManager,
  styleManager,
  traitManager,
} from "@/config/gjs-config";
import { callSaveProject } from "@/fetcher/gjs";
interface Props {
  projectId: string;
}
const Test: React.FC<Props> = ({ projectId }) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  // https://fontawesome.com/v4/icons/
  const storageApiPath = useMemo(
    () => `/api/project/${projectId}`,
    [projectId]
  );

  const assetApiPath = useMemo(() => `/api/project/${projectId}`, [projectId]);
  useEffect(() => {
    console.log("call");
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
              if (result.data) {
                return result.data;
              } else {
                return {};
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
          async command(editor: any) {
            const projectData = editor.getProjectData();
            // console.log(JSON.stringify(projectData));
            const res = await callSaveProject(storageApiPath, projectData);
            console.log(res);
          },
        },
        {
          id: "export",
          attributes: { class: "fa fa-upload", title: "Export" },
          command(editor: any) {
            console.log(editor.Commands.getAll());
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
  }, []);
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
            <div className="selector-container"></div>
          </div>
          <div className="blocks-container"></div>
          <div className="traits-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Test;
