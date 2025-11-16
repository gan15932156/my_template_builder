"use client";
import { TBlueprint } from "@/types/types";
import { Row } from "@tanstack/react-table";
import styled from "styled-components";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setModalImageUrl } from "@/libs/imageModalSlice";

interface Props {
  row: Row<TBlueprint>;
}
const ImageCellWrapper = styled.div`
  text-align: center;
  position: relative;
`;

const CellImage = styled(Image)`
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
`;
const ImageCell: React.FC<Props> = ({ row }) => {
  const { imageUrl } = row.original;
  const dispatch = useAppDispatch();
  return imageUrl ? (
    <ImageCellWrapper>
      <CellImage
        onClick={() => dispatch(setModalImageUrl(imageUrl))}
        style={{ objectFit: "contain" }}
        width={320}
        height={160}
        priority={true}
        src={imageUrl}
        alt="Blueprint screenshot image"
      />
    </ImageCellWrapper>
  ) : null;
};

export default ImageCell;
