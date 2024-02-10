import InputFieldWithLabel from "./InputFieldWithLabel";
import DatePicker from "./DatePicker";
import { Label } from "@radix-ui/react-label";

const EventForm = ({
  title,
  deadline,
  status,
  label,
  description,
  handleInput, // Update the prop type
  onDateChange,
}: {
  title: string;
  deadline: Date;
  status: string;
  label: string;
  description: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void; // Update the prop type
  onDateChange: (date: Date) => void;
}) => {
  return (
    <div className="grid gap-4 py-4">
      <InputFieldWithLabel
        label="Event Name"
        placeholder="Going to Gym"
        type="text"
        onChange={handleInput}
        name="title"
        value={title}
        required
      />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="date"
          className="text-right font-semibold"
          style={{ fontSize: "0.875rem" }}
        >
          date
        </Label>
        <DatePicker setvalue={onDateChange} value={date} />
      </div>

      <InputFieldWithLabel
        label="Description"
        placeholder="Details about your Event"
        type="text"
        onChange={handleInput}
        name="description"
        value={description}
        required
      />
      <InputFieldWithLabel
        label="Status"
        placeholder="Current status of your Event"
        type="text"
        onChange={handleInput}
        name="status"
        value={status}
        required
      />
      <InputFieldWithLabel
        label="Label"
        placeholder="Label for your Event"
        type="text"
        onChange={handleInput}
        name="label"
        value={label}
        required
      />
    </div>
  );
};

export default EventForm;
