"use client";
import {
  FiCreditCard,
  FiType,
  FiAlignLeft,
  FiBox,
  FiExternalLink,
  FiImage,
} from "react-icons/fi";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { TBasicBlock, TBlueprint } from "../type";
import { Block } from "./styledComponents";
import { useDraggable } from "@dnd-kit/core";

export const blockIconMap: Record<string, JSX.Element> = {
  FiCreditCard: <FiCreditCard color={editorStyle.primary500} size={24} />,
  FiType: <FiType color={editorStyle.primary500} size={24} />,
  FiAlignLeft: <FiAlignLeft color={editorStyle.primary500} size={24} />,
  FiBox: <FiBox color={editorStyle.primary500} size={24} />,
  FiExternalLink: <FiExternalLink color={editorStyle.primary500} size={24} />,
  FiImage: <FiImage color={editorStyle.primary500} size={24} />,
};
interface Props {
  block: TBasicBlock | TBlueprint;
}
const BlockItem: React.FC<Props> = ({ block }) => {
  const { id, isBlueprint, category } = block;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: "draggable-" + id,
    data: {
      isBlueprint,
      id,
      category: category ? category : "other",
      isBlock: isBlueprint ? false : true,
    },
  });
  if (isBlueprint) {
    const blueprint = block as TBlueprint; // Type narrowing for blueprint
    return (
      <Block
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        $isDragging={isDragging}
      >
        <img
          src={blueprint.imageUrl}
          alt={blueprint.name}
          style={{ width: "24px", height: "24px" }}
        />
        <p style={{ textAlign: "center" }}>
          {blueprint.name ? blueprint.name : "n/a"}
        </p>
      </Block>
    );
  } else {
    const basicBlock = block as TBasicBlock; // Type narrowing for basic block
    return (
      <Block
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        $isDragging={isDragging}
      >
        {basicBlock.icon && blockIconMap[basicBlock.icon]}
        <p style={{ textAlign: "center" }}>{basicBlock.name}</p>
      </Block>
    );
  }
};

export default BlockItem;