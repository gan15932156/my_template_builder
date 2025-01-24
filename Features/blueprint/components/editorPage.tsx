"use client";
import dynamic from "next/dynamic";
import EditorWrapper from "./styledComponents/EditorWrapper";
import Editor from "../features/editor/components/Editor";
import TopPanel from "../features/panel/components/TopPanel";
import SidePanel from "../features/panel/components/SidePanel";
import DragContextOverlay from "../provider/DragContextOverlay";
interface Props {
  blueprintId: string;
}
const DndContextWithNoSSR = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false }
);
const EditorPage: React.FC<Props> = ({ blueprintId }) => {
  return (
    <EditorWrapper>
      <DndContextWithNoSSR>
        <TopPanel />
        {/* <Editor blueprintId={blueprintId} /> */}
        {/* <SidePanel /> */}
        {/* <DragContextOverlay /> */}
      </DndContextWithNoSSR>
    </EditorWrapper>
  );
};

export default EditorPage;
