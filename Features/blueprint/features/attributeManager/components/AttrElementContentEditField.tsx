"use client";

import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import {
  FormControl,
  InputField,
} from "../../styleManager/components/PropertyField";
import styled from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
export const Textarea = styled.textarea`
  border: 1px solid ${editorStyle.primary500};
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  padding-inline: 0.2rem;
`;
interface Props {
  elementId: string;
  value: string;
}
const AttrElementContentEditField: React.FC<Props> = ({ elementId, value }) => {
  const [propertyValue, setPropertyValue] = useState(value);
  const { handleUpdateElementContent } = useSelectedElement();
  const handleOnFieldBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
    handleUpdateElementContent(elementId, event.target.value);
  };
  const handleOnFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.stopPropagation();
    setPropertyValue(event.target.value);
  };
  useEffect(() => {
    setPropertyValue(value);
  }, [elementId]);
  return (
    <FormControl>
      <label htmlFor={"content"}>Content</label>
      <Textarea
        name="content"
        id="content"
        spellCheck={false}
        cols={40}
        rows={4}
        value={propertyValue}
        onBlur={handleOnFieldBlur}
        onChange={handleOnFieldChange}
      ></Textarea>
    </FormControl>
  );
};

export default AttrElementContentEditField;
