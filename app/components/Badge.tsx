import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
type Variant = "primary" | "success" | "danger" | "warning";
interface Props {
  text: string;
  variant?: Variant;
  className?: string;
}
const StyledBadge = styled.span<{ $variant: Variant }>`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.64rem;
  font-weight: 600;
  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: ${editorStyle.primary500};
      color: ${editorStyle.white};
    `}
  ${(props) =>
    props.$variant === "success" &&
    css`
      background-color: ${editorStyle.success};
      color: ${editorStyle.white};
    `}
  ${(props) =>
    props.$variant === "danger" &&
    css`
      background-color: ${editorStyle.danger};
      color: ${editorStyle.white};
    `}
  ${(props) =>
    props.$variant === "warning" &&
    css`
      background-color: ${editorStyle.warning};
      color: ${editorStyle.white};
    `}
`;
const Badge: React.FC<Props> = ({
  text,
  variant = "primary",
  className = "",
}) => {
  return <StyledBadge $variant={variant}>{text}</StyledBadge>;
};

export default Badge;
