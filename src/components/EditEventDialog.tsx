import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IEventsProps } from "@/types/interface";
import EventForm from "./Form/EventForm";
// import InputFieldWithLabel from "./Form/InputFieldWithLabel";

interface EditEventDialogProps {
  icon: React.ReactNode;
  eventData: IEventsProps;
  onEdit: (data: IEventsProps) => Promise<void>;
}

const EditEventDialog: React.FC<EditEventDialogProps> = ({
  icon,
  eventData,
  onEdit,
}) => {
  const [localdata, setLocalData] = useState(eventData);

  const handleInput = (_: React.ChangeEvent<HTMLInputElement>) =>
    setLocalData({
      ...localdata,
      [_.target.name]: _.target.value,
    });

  const onDateChange = (date: Date) => setLocalData({ ...localdata, date });

  return (
    <Dialog>
      <DialogTrigger asChild>{icon}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Make changes to your Event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <EventForm
            {...localdata}
            // @ts-expect-error
            date={
              // @ts-expect-error
              localdata.date?.seconds
                ? // @ts-expect-error
                  localdata.date.seconds * 1000
                : undefined
            }
            handleInput={handleInput}
            onDateChange={onDateChange}
          />
          {/* <InputFieldWithLabel
            name={displayName}
            label={"User Name"}
            type={"text"}
            placeholder={"Your User Name here..."}
          /> */}
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Event Name
            </Label>
            <Input
              name="title"
              value={title}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Event details
            </Label>
            <Input
              name="description"
              value={description}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Adress
            </Label>
            <Input
              name="location"
              value={location}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Photo
            </Label>
            <Input
              name="image"
              value={image}
              className="col-span-3"
              onChange={handleInputChange}
              type="file"
            />
          </div> */}
        </div>
        <DialogFooter>
          <Button onClick={() => onEdit(localdata)} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
