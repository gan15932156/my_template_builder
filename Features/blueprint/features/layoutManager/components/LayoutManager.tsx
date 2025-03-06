"use client";

import { useAppSelector } from "@/hooks/reduxHooks";

import LayoutAccordion from "./LayoutAccordion";
import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";

// const currentBlueprint: TBlueprint = {
//   id: "cm6a6ugc00000eu5grqaskyc6",
//   name: "null",
//   category: "listView",
//   isBlueprint: true,
//   styles: {
//     card1: {
//       hover: { "box-shadow": "0px 6px 10px rgba(0,0,0,0.15)" },
//       normal: {
//         padding: "1rem",
//         "box-shadow": "0px 4px 6px rgba(0,0,0,0.1)",
//         "border-radius": "1rem",
//         "background-color": "white",
//       },
//       "nth(2)": { color: "red" },
//     },
//     "Ev-CUGOdj4op": { normal: { padding: "1rem" } },
//     cMe8Wjr_AwyI: { normal: { padding: "1rem" } },
//     "-v1mdWx6Plbm": { normal: { padding: "1rem" } },
//   },
//   element: {
//     id: "card1",
//     category: "box",
//     elmType: "box",
//     tag: "div",
//     isListing: true,
//     isRand: false,
//     content: [
//       {
//         id: "field1",
//         tag: "input",
//         content: "",
//         elmType: "input",
//         category: "textField",
//         isListing: false,
//         isRand: false,
//         attributes: { type: "text", placeholder: "input here" },
//       },
//       {
//         id: "cMe8Wjr_AwyI",
//         category: "basic",
//         elmType: "box",
//         tag: "div",
//         content: [
//           {
//             id: "-v1mdWx6Plbm",
//             category: "basic",
//             elmType: "box",
//             tag: "div",
//             content: [],
//             isListing: false,
//             isRand: false,
//           },
//         ],
//         isListing: false,
//         isRand: false,
//       },
//       {
//         id: "Ev-CUGOdj4op",
//         category: "basic",
//         elmType: "box",
//         tag: "div",
//         content: [],
//         isListing: false,
//         isRand: false,
//       },
//     ],
//   },
// };

const LayoutManager = () => {
  const currentBlueprint = useAppSelector(selectBlueprint);
  if (!currentBlueprint) return null;
  if (!currentBlueprint.element) return null;
  return (
    <div>
      <LayoutAccordion element={currentBlueprint.element} />
    </div>
  );
};

export default LayoutManager;
