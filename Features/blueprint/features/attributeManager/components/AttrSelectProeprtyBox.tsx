"use client";

interface Props {
  name: string; // attr name
  value: string; // attr value
  elementId: string;
  type: "BOX_TAG" | "NA";
}
const AttrSelectProeprtyBox: React.FC<Props> = ({
  name,
  value,
  elementId,
  type,
}) => {
  return <div>AttrSelectProeprtyBox</div>;
};

export default AttrSelectProeprtyBox;
