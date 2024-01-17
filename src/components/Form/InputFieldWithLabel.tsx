import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface iInputFieldProps {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}

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
