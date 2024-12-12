import { html2CanvasConfig } from "@/config/htmlToCanvas";
import { saveProject } from "@/fetcher/gjs";
import { ProjectData } from "grapesjs";
import html2canvas from "html2canvas";
export const update = async (
  iframeElement: HTMLIFrameElement,
  projectId: string,
  data: ProjectData
) => {
  if (iframeElement && iframeElement.contentWindow) {
    const iframeDocument = iframeElement.contentWindow.document;
    try {
      const canvas = await html2canvas(iframeDocument.body, html2CanvasConfig);
      const imgData = canvas.toDataURL("image/jpg");
      const res = await fetch(`/api/project/${projectId}`, {
        method: "POST",
        body: JSON.stringify({ imgData, data }),
      });
      return res;
    } catch (error) {
      console.error("Error capturing element:", error);
    }
  } else {
    const api = `/api/project/${projectId}`;
    const res = await saveProject(api, data);
    return res;
  }
};
