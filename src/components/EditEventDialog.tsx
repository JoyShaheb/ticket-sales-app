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
import EventForm from "./Form/EventForm";
// import InputFieldWithLabel from "./Form/InputFieldWithLabel";
import { IEditEventDialogProps } from "@/types/interface";

const EditEventDialog: React.FC<IEditEventDialogProps> = ({
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
            // @ts-expect-error: error
            date={
              // @ts-expect-error: error
              localdata.date?.seconds
                ? // @ts-expect-error: error
                  localdata.date.seconds * 1000
                : undefined
            }
            handleInput={handleInput}
            onDateChange={onDateChange}
          />
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
