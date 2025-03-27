"use client";

import { ID_LENGTH } from "@/Features/blueprint/constants";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { nanoid } from "nanoid";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import {
  DeleteButton,
  InputField,
} from "../../styleManager/components/PropertyField";
import { FiX, FiPlus } from "react-icons/fi";

const Wrapper = styled.div`
  font-size: 0.8rem;
  background-color: ${editorStyle.primary600};
  padding: 0.4rem;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
`;
const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2rem;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
interface Props {
  name: string; // attr name
  values: string[]; // attr value
  elementId: string;
}
const transformValues = (values: string[]) => {
  let rel: { [key: string]: string } = {};
  values.map((item) => {
    const id = nanoid(ID_LENGTH);
    rel[id] = item;
  });
  return rel;
};
const transformSetValues = (values: { [key: string]: string }) => {
  let rel: string[] = [];
  Object.keys(values).forEach((key) => {
    rel.push(values[key]);
  });
  return rel;
};
const AttrSelectOptionManager: React.FC<Props> = ({
  name,
  values,
  elementId,
}) => {
  const { handleUpdateElementAttr } = useSelectedElement();
  const [options, setOptions] = useState(transformValues(values));
  const handleAddOption = () => {
    const id = nanoid(ID_LENGTH);
    const rel = transformSetValues({
      ...options,
      [id]: "option" + String(Object.keys(options).length + 1),
    });
    handleUpdateElementAttr(elementId, name, rel);
    setOptions((prev) => {
      return {
        ...prev,
        [id]: "option" + String(Object.keys(options).length + 1),
      };
    });
  };
  const handleDeleteOption = (id: string) => {
    const newOptions = { ...options };
    delete newOptions[id];
    const rel = transformSetValues(newOptions);
    handleUpdateElementAttr(elementId, name, rel);
    setOptions(newOptions);
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setOptions((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };
  const handleOnBlue = () => {
    const rel = transformSetValues(options);
    handleUpdateElementAttr(elementId, name, rel);
  };
  useEffect(() => {
    setOptions(transformValues(values));
  }, [elementId]);
  return (
    <Wrapper>
      <p>options</p>
      <OptionWrapper>
        {Object.keys(options).map((key) => (
          <InputWrapper key={key}>
            <InputField
              type="text"
              onBlur={handleOnBlue}
              onChange={(e) => handleOnChange(e, key)}
              name={options[key] + key}
              id={options[key] + key}
              value={options[key]}
            />
            <DeleteButton
              title="Delete option."
              type="button"
              onClick={() => handleDeleteOption(key)}
            >
              <FiX />
            </DeleteButton>
          </InputWrapper>
        ))}
        <DeleteButton title="Add option." onClick={handleAddOption}>
          <FiPlus />
        </DeleteButton>
      </OptionWrapper>
    </Wrapper>
  );
};

export default AttrSelectOptionManager;
