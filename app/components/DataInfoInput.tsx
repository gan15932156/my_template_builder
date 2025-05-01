"use client";
import styled from "styled-components";
interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled: boolean;
  id: string;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;
const Input = styled.input`
  appearance: none;
  border: none;
  border-radius: 2px;
  box-shadow: none;
  width: 100%;
  position: relative;
  padding: 5px;
  z-index: 1;
  font-size: 0.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  color: #ddd;
`;

const DataInfoInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onBlur,
  onChange,
  disabled = false,
  id,
}) => {
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        id={id}
      />
    </Wrapper>
  );
};

export default DataInfoInput;
