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
          media: `<img style="height:100px;width:100px;object-fit:contain;" src=${template.imageUrl} alt="Test image"/>`,
          content: `${template.html}<style>${template.css}</style>`,
          category: template.category,
        });
      }
    });
  };
  editor.on("load", () => {
    populateBlocks();
  });
};
