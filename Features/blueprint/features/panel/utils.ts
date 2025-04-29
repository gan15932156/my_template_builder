import { html2CanvasConfig } from "@/config/htmlToCanvas";
import html2canvas from "html2canvas";
export const getEditorImage = async (iframeElement: HTMLElement) => {
  try {
    const canvas = await html2canvas(iframeElement, html2CanvasConfig);
    const imgData = canvas.toDataURL("image/jpg");
    return imgData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
