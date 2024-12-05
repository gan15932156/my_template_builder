import { IComponentBody } from "@/types/types";
import { Editor } from "grapesjs";
const fetchTemplateBlocks = async (): Promise<IComponentBody[]> => {
  try {
    const response = await fetch("/api/component/body");
    if (!response.ok) {
      throw new Error("Failed to fetch template blocks");
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching template blocks:", error);
    return [];
  }
};
export const templateBlock = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  const populateBlocks = async () => {
    const templates = await fetchTemplateBlocks();
    if (templates.length === 0) {
      console.warn("No template blocks received from the API.");
      return;
    }
    templates.forEach((template) => {
      if (template.html) {
        blockManager.add(template.id, {
          label: template.name || "-",
          content: `${template.html}<style>${template.css}</style>`,
          category: template.category,
        });
      }
    });
  };
  editor.on("load", () => {
    populateBlocks();
  });
  // editor.Blocks.add("my-first-block", {
  //   label: "Simple block",
  //   category: "Custom block",
  //   content: {
  //     type: "text",
  //     style: { color: "#d983a6", padding: "10px", "background-color": "red" },
  //     attributes: { id: "ikjl" },
  //     components: [
  //       {
  //         type: "textnode",
  //         content: "Insert your text here",
  //       },
  //     ],
  //   },
  // });
  // editor.Blocks.add("my-second-block", {
  //   label: "Test block",
  //   category: "Custom block",
  //   content: `
  //               <div id="test123456" class="test">Initial content</div><div id="ikjl-2">Insert your text here</div><div id="ikjl-4">Insert your text here</div>
  //               <style>.test{color:red;}#ikjl-2{color:#d983a6;padding:10px;background-color:red;}#ikjl-4{color:#d983a6;padding:10px;background-color:red;}</style>
  //             `,
  // });
  // editor.Blocks.add("my-third-block", {
  //   label: "Test block 2",
  //   category: "Custom block",
  //   content: `
  //               <div class="gjs-row" id="i9qi"><div class="gjs-cell"><div id="i7mj">Insert your text here</div></div></div>
  //               <style>.gjs-row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.gjs-cell{width:8%;display:table-cell;height:75px;}#i7mj{padding:10px;}@media (max-width: 768px){.gjs-cell{width:100%;display:block;}}</style>
  //             `,
  // });
};
