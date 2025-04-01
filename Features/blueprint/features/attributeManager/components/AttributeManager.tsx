"use client";

import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import AttrInputField from "./AttrInputField";
import AttrSelectbox from "./AttrSelectbox";
import styled from "styled-components";
import AttrSelectOptionManager from "./AttrSelectOptionManager";
import AttrCheckboxField from "./AttrCheckboxField";
import { dragElementRule } from "@/Features/blueprint/constants/dragElementRule";
import AttrSelectTag from "./AttrSelectTag";
import AttrElementContentEditField from "./AttrElementContentEditField";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import BlueprintNameEditField from "../BlurprintAttr/components/BlueprintNameEditField";
import BlueprintCategorySelectbox from "../BlurprintAttr/components/BlueprintCategorySelectbox";
const Form = styled.div`
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
`;
const Divider = styled.hr`
  display: block;
  background-color: ${editorStyle.secondary500};
  margin-block: 0.4rem;
`;
const Heading = styled.p`
  font-size: 0.8rem;
  background-color: ${editorStyle.primary600};
  padding: 0.2rem;
  margin-bottom: 0.4rem;
`;
const AttributeManager = () => {
  const { selectedElement } = useSelectedElement();
  return (
    <Form>
      <Heading>Blueprint attributes</Heading>
      <BlueprintNameEditField />
      <BlueprintCategorySelectbox />
      {selectedElement && (
        <>
          <Divider />
          <Heading>Element attributes</Heading>
          {(selectedElement.elmType === "text" ||
            selectedElement.elmType === "button") && (
            <AttrElementContentEditField
              value={selectedElement.content as string}
              elementId={selectedElement.id}
            />
          )}
          {(selectedElement.elmType === "box" ||
            selectedElement.elmType === "text") && (
            <>
              <AttrSelectTag
                name={"tag"}
                value={selectedElement.tag}
                elementId={selectedElement.id}
                tags={dragElementRule[selectedElement.elmType].tag}
              />
            </>
          )}
          {selectedElement.elmType === "input" && (
            <>
              {selectedElement.attributes &&
                selectedElement.attributes.hasOwnProperty("type") && (
                  <AttrSelectbox
                    name={"type"}
                    value={selectedElement.attributes.type as string}
                    elementId={selectedElement.id}
                    type="INPUT_TYPE"
                  />
                )}
              {selectedElement.attributes &&
              selectedElement.attributes.hasOwnProperty("name") ? (
                <AttrInputField
                  valueType="ATTR"
                  name={"name"}
                  value={selectedElement.attributes.name as string}
                  elementId={selectedElement.id}
                />
              ) : (
                <AttrInputField
                  valueType="ATTR"
                  name={"name"}
                  value={""}
                  elementId={selectedElement.id}
                />
              )}
              {selectedElement.attributes &&
              selectedElement.attributes.hasOwnProperty("placeholder") ? (
                <AttrInputField
                  valueType="ATTR"
                  name={"placeholder"}
                  value={selectedElement.attributes.placeholder as string}
                  elementId={selectedElement.id}
                />
              ) : (
                <AttrInputField
                  valueType="ATTR"
                  name={"placeholder"}
                  value={""}
                  elementId={selectedElement.id}
                />
              )}
            </>
          )}
          {selectedElement.elmType === "select" && (
            <>
              {selectedElement.attributes &&
              selectedElement.attributes.hasOwnProperty("name") ? (
                <AttrInputField
                  valueType="ATTR"
                  name={"name"}
                  value={selectedElement.attributes.name as string}
                  elementId={selectedElement.id}
                />
              ) : (
                <AttrInputField
                  valueType="ATTR"
                  name={"name"}
                  value={""}
                  elementId={selectedElement.id}
                />
              )}
              {selectedElement.attributes &&
                selectedElement.attributes.hasOwnProperty("options") && (
                  <AttrSelectOptionManager
                    name={"options"}
                    elementId={selectedElement.id}
                    values={selectedElement.attributes.options as string[]}
                  />
                )}
            </>
          )}
          {selectedElement.elmType === "label" && (
            <>
              {selectedElement.attributes &&
              selectedElement.attributes.hasOwnProperty("labelText") ? (
                <AttrInputField
                  valueType="ATTR"
                  name={"labelText"}
                  value={selectedElement.attributes.labelText as string}
                  elementId={selectedElement.id}
                />
              ) : (
                <AttrInputField
                  valueType="ATTR"
                  name={"labelText"}
                  value={""}
                  elementId={selectedElement.id}
                />
              )}
            </>
          )}
          {selectedElement.elmType === "box" && (
            <AttrCheckboxField
              valueType="PROPERTY"
              name={"isListing"}
              value={selectedElement.isListing}
              elementId={selectedElement.id}
            />
          )}

          <AttrCheckboxField
            valueType="PROPERTY"
            name={"isRand"}
            value={selectedElement.isRand}
            elementId={selectedElement.id}
          />
        </>
      )}
    </Form>
  );
};

export default AttributeManager;
