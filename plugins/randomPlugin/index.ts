import { Editor } from "grapesjs";

export const randomElement = (editor: Editor) => {
  editor.on("block:drag:start", (block) => {
    console.log(block);
  });
  // const modal = editor.Modal;
  // const modalContent = `
  //     <div style="padding: 20px; font-family: Arial, sans-serif;">
  //       <h2 style="margin-top: 0;">Component Settings</h2>
  //       <label for="component-type">Component Type:</label>
  //       <select id="component-type" style="width: 100%; margin-bottom: 10px;">
  //         <option value="heading">Heading</option>
  //         <option value="paragraph">Paragraph</option>
  //         <option value="button">Button</option>
  //         <option value="card">Card</option>
  //         <option value="grid">Grid</option>
  //         <option value="form">Form</option>
  //       </select>
  //       <label for="background-color">Background Color:</label>
  //       <input type="color" id="background-color" value="#ffffff" style="width: 100%; margin-bottom: 10px;" />
  //       <label for="text-color">Text Color:</label>
  //       <input type="color" id="text-color" value="#000000" style="width: 100%; margin-bottom: 10px;" />
  //       <label for="text-content">Text Content:</label>
  //       <input type="text" id="text-content" value="Your Text Here" style="width: 100%; margin-bottom: 20px;" />
  //       <button id="apply-settings" style="width: 100%; padding: 10px; background: #3498db; color: white; border: none; cursor: pointer;">
  //         Apply and Add
  //       </button>
  //     </div>
  //   `;
  // const panels = editor.Panels.getPanels();
  // //   console.log(panels);
  // editor.Panels.addButton("panel-switcher", {
  //   id: "open-random-settings",
  //   className: "fa fa-sliders",
  //   command: "open-complex-settings",
  //   attributes: { title: "Random Element Settings" },
  // });
  // // Define the command to open the modal
  // editor.Commands.add("open-complex-settings", {
  //   run: () => {
  //     modal.setTitle("Component Settings");
  //     modal.setContent(modalContent);
  //     modal.open();
  //     // Handle Apply and Add button
  //     document
  //       .getElementById("apply-settings")
  //       ?.addEventListener("click", () => {
  //         const componentType = (
  //           document.getElementById("component-type") as HTMLSelectElement
  //         ).value;
  //         const bgColor = (
  //           document.getElementById("background-color") as HTMLInputElement
  //         ).value;
  //         const textColor = (
  //           document.getElementById("text-color") as HTMLInputElement
  //         ).value;
  //         const textContent = (
  //           document.getElementById("text-content") as HTMLInputElement
  //         ).value;
  //         let componentHTML = "";
  //         // Define HTML templates for each component
  //         switch (componentType) {
  //           case "heading":
  //             componentHTML = `<h1 style="color: ${textColor};">${textContent}</h1>`;
  //             break;
  //           case "paragraph":
  //             componentHTML = `<p style="color: ${textColor};">${textContent}</p>`;
  //             break;
  //           case "button":
  //             componentHTML = `<button style="background-color: ${bgColor}; color: ${textColor}; padding: 10px 20px;">${textContent}</button>`;
  //             break;
  //           case "card":
  //             componentHTML = `
  //               <div style="border: 1px solid ${textColor}; padding: 20px; background-color: ${bgColor}; color: ${textColor}; border-radius: 8px; max-width: 300px;">
  //                 <h3>${textContent}</h3>
  //                 <p>This is a customizable card.</p>
  //                 <button style="background-color: ${textColor}; color: ${bgColor}; border: none; padding: 10px; cursor: pointer;">Learn More</button>
  //               </div>
  //             `;
  //             break;
  //           case "grid":
  //             componentHTML = `
  //               <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background-color: ${bgColor}; color: ${textColor}; padding: 20px;">
  //                 <div style="border: 1px solid ${textColor}; padding: 10px;">Item 1</div>
  //                 <div style="border: 1px solid ${textColor}; padding: 10px;">Item 2</div>
  //                 <div style="border: 1px solid ${textColor}; padding: 10px;">Item 3</div>
  //               </div>
  //             `;
  //             break;
  //           case "form":
  //             componentHTML = `
  //               <form style="background-color: ${bgColor}; color: ${textColor}; padding: 20px; border-radius: 8px;">
  //                 <label>Name:</label>
  //                 <input type="text" style="width: 100%; margin-bottom: 10px; border: 1px solid ${textColor};" />
  //                 <label>Email:</label>
  //                 <input type="email" style="width: 100%; margin-bottom: 10px; border: 1px solid ${textColor};" />
  //                 <button type="submit" style="background-color: ${textColor}; color: ${bgColor}; padding: 10px;">Submit</button>
  //               </form>
  //             `;
  //             break;
  //         }
  //         // Add the component to the canvas
  //         editor.addComponents(componentHTML);
  //         modal.close();
  //         modal.setContent("");
  //       });
  //   },
  // });
};
