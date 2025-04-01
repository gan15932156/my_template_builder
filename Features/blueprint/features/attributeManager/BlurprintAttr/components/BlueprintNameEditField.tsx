"use client";

import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import {
  FormControl,
  InputField,
} from "../../../styleManager/components/PropertyField";
import useSaveBlueprint from "@/Features/blueprint/hooks/useSaveBlueprint";

const BlueprintNameEditField: React.FC = () => {
  const currentBlueprint = useAppSelector(selectBlueprint);
  const [value, setValue] = useState(currentBlueprint?.name ?? "");
  const {
    blueprintMutate: { mutate, isPending },
  } = useSaveBlueprint();
  const handleOnFieldBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (currentBlueprint) {
      mutate({ ...currentBlueprint, name: event.target.value });
    }
  };
  const handleOnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setValue(event.target.value);
  };
  useEffect(() => {
    if (currentBlueprint) setValue(currentBlueprint?.name ?? "");
  }, [currentBlueprint]);
  return (
    <FormControl>
      <label htmlFor="name">name</label>
      <InputField
        type="text"
        name="name"
        id="name"
        value={value}
        onBlur={handleOnFieldBlur}
        onChange={handleOnFieldChange}
        disabled={isPending}
      />
    </FormControl>
  );
};

export default BlueprintNameEditField;
