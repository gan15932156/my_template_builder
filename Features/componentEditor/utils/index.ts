import { html2CanvasConfig } from "@/config/htmlToCanvas";
import html2canvas from "html2canvas";
export const captureImage = async (iframeElement: HTMLIFrameElement) => {
  if (iframeElement && iframeElement.contentWindow) {
    const iframeDocument = iframeElement.contentWindow.document;
    try {
      const canvas = await html2canvas(iframeDocument.body, html2CanvasConfig);
      const imgData = canvas.toDataURL("image/jpg");
      return imgData;
    } catch (error) {
      console.error("Error capturing element:", error);
      return null;
    }
  } else {
    return null;
  }
};
