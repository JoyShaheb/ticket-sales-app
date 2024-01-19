import React, { FC } from "react";
import InputFieldWithLabel from "./InputFieldWithLabel";

interface IDocumentFormProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: {
    name: string;
    description: string;
  };
}

const DocumentForm: FC<IDocumentFormProps> = ({ handleInputChange, data }) => {
  return (
    <div className="flex flex-col gap-2">
      <InputFieldWithLabel
        label="Name of Document"
        name="name"
        type="text"
        onChange={handleInputChange}
        placeholder="Document Name"
        required
        value={data.name}
      />
      <InputFieldWithLabel
        label="Description of the document"
        name="description"
        type="text"
        onChange={handleInputChange}
        placeholder="Any description"
        required
        value={data.description}
      />
    </div>
  );
};

export default DocumentForm;
