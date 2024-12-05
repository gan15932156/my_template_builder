"use client";
interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled: boolean;
  id: string;
}
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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        id={id}
      />
    </div>
  );
};

export default DataInfoInput;
