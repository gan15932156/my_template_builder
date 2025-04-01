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
const Form = styled.div`
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: center;
  gap: 0.2rem;
`;
const AttributeManager = () => {
  const { selectedElement } = useSelectedElement();
  if (!selectedElement) return null;
  return (
    <Form>
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
    </Form>
  );
};

export default AttributeManager;
