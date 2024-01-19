import { FC } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IInputFieldProps } from "@/types/interface";

const InputField: FC<IInputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
