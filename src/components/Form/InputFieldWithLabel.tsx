import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { iInputFieldProps } from "@/types/interface";
import { FC } from "react";

const InputFieldWithLabel: FC<iInputFieldProps> = ({
  label,
  name,
  placeholder,
  type,
  onChange,
  required,
  value,
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input
        type={type}
        onChange={onChange}
        id={name}
        required={required}
        value={value}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputFieldWithLabel;
