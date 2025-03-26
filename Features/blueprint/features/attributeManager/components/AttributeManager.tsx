"use client";

import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import AttrInputField from "./AttrInputField";
import AttrSelectbox from "./AttrSelectbox";
import styled from "styled-components";
import AttrSelectOptionManager from "./AttrSelectOptionManager";
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
              name={"name"}
              value={selectedElement.attributes.name as string}
              elementId={selectedElement.id}
            />
          ) : (
            <AttrInputField
              name={"name"}
              value={""}
              elementId={selectedElement.id}
            />
          )}
          {selectedElement.attributes &&
          selectedElement.attributes.hasOwnProperty("placeholder") ? (
            <AttrInputField
              name={"placeholder"}
              value={selectedElement.attributes.placeholder as string}
              elementId={selectedElement.id}
            />
          ) : (
            <AttrInputField
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
              name={"name"}
              value={selectedElement.attributes.name as string}
              elementId={selectedElement.id}
            />
          ) : (
            <AttrInputField
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
    </Form>
  );
};

export default AttributeManager;
