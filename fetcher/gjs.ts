import { ProjectData } from "grapesjs";

export const saveProject = async (path: string, data: ProjectData) => {
  try {
    const res = await fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const dataJson = await res.json();
    return dataJson;
  } catch (error) {
    console.error("error save project", error);
    return { success: false, message: "Error" };
  }
};
// export const saveComponent = async (path: string, data: TcomponentBody) => {
//   try {
//     const res = await fetch(path, {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//     const dataJson = await res.json();
//     return dataJson;
//   } catch (error) {
//     console.error("error save component", error);
//     return { success: false, message: "Error" };
//   }
// };
