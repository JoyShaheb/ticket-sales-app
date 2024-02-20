import InputFieldWithLabel from "./InputFieldWithLabel";
import DatePicker from "./DatePicker";
import { Label } from "@radix-ui/react-label";
import { IEventsForm } from "@/types/interface";

const EventForm = ({
  title,
  date,
  description,
  location,
  // image,
  handleInput, // Update the prop type
  onDateChange,
}: IEventsForm) => {
  return (
    <div className="grid gap-4 py-4">
      <InputFieldWithLabel
        label="Event Name"
        placeholder="Add Name here..."
        type="text"
        onChange={handleInput}
        name="title"
        value={title}
        required
      />
      <InputFieldWithLabel
        label="Description"
        placeholder="Details about your Event"
        type="text"
        onChange={handleInput}
        name="description"
        value={description}
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
        <DatePicker setvalue={onDateChange} value={date as Date} />
      </div>
      <InputFieldWithLabel
        label="location"
        placeholder="Event location"
        type="text"
        onChange={handleInput}
        name="location"
        value={location}
        required
      />
      {/* <InputFieldWithLabel
        label="image"
        placeholder="Event image"
        type="file"
        onChange={handleInput}
        name="image"
        value={image}
        // required
      /> */}
    </div>
  );
};

export default EventForm;
