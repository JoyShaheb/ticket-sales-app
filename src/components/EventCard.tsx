import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewEventType } from "@/types/types";
import EventDropdown from "./EventDropdown";
import { IEventsProps } from "@/types/interface";
import dayjs from "dayjs";

interface ExtendedEventType extends NewEventType {
  id: string;
  deleteEvent: (id: string) => Promise<string>;
  onEdit: (data: IEventsProps) => Promise<void>;
}

const EventCard = ({
  date,
  id,
  description,
  title,
  location,
  image,
  deleteEvent,
  onEdit,
  userOwner,
}: ExtendedEventType) => {
  const eventData = {
    id,
    date,
    description,
    title,
    location,
    image,
    userOwner,
  };
  return (
    <Card className="w-[350px]">
      <CardHeader className="flex justify-between">
        <CardTitle>{title}</CardTitle>
        <EventDropdown
          deleteEvent={(id) => deleteEvent(id)}
          eventData={eventData}
          onEdit={onEdit}
        />
      </CardHeader>
      <CardContent>
        <CardDescription>{image}</CardDescription>
        <CardDescription>{description}</CardDescription>
        <div className="flex justify-between">
          <CardDescription>
            {" "}
            {date ? dayjs(date).format("dddd, MMMM D, YYYY") : "No Deadline"}
          </CardDescription>
          <CardDescription>{location}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Button onClick={onEdit} variant="outline">
          Edit
        </Button>
        <Button onClick={deleteEvent} variant="outline">
          Delete
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
