"use client";

import PropertyField from "./PropertyField";

interface Props {
  currentStyleState: string;
}
const PropertyForm: React.FC<Props> = ({ currentStyleState }) => {
  return (
    <form>
      <PropertyField
        currentStyleState={currentStyleState}
        propertyName="padding"
      />
      <PropertyField
        currentStyleState={currentStyleState}
        propertyName="display"
      />
      <PropertyField
        currentStyleState={currentStyleState}
        propertyName="background-color"
      />
      <PropertyField
        currentStyleState={currentStyleState}
        propertyName="box-shadow"
      />
    </form>
  );
};

export default PropertyForm;
