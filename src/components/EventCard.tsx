import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EventDropdown from "./EventDropdown";
import { IEventDataToUpdate, iExtendedEventType } from "@/types/interface";
import dayjs from "dayjs";

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
}: iExtendedEventType) => {
  const eventData: IEventDataToUpdate = {
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
          deleteEvent={() => deleteEvent()}
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
