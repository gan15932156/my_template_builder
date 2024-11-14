import { ProjectData } from "grapesjs";

export const callSaveProject = async (path: string, data: ProjectData) => {
  try {
    const res = await fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const dataJson = await res.json();
    return dataJson;
  } catch (error) {
    console.error("error save project data", error);
    return { success: false, message: "Error" };
  }
};
