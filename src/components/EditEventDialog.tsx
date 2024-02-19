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

  const onDateChange = (date: Date) => {
    const parsedDate = new Date(date);
    const databaseFormat = {
      nanoseconds: parsedDate.getMilliseconds() * 1e6,
      seconds: Math.floor(parsedDate.getTime() / 1000),
    };

    setLocalData({ ...localdata, date: databaseFormat as unknown as Date });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(localdata);
  };
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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <EventForm
              description={localdata.description}
              location={localdata.location}
              title={localdata.title}
              // image={localdata.image}
              //@ts-expect-error: error
              date={localdata.date?.seconds * 1000}
              handleInput={handleInput}
              onDateChange={onDateChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
