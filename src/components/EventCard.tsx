import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
      <CardFooter className="flex justify-between">
        <CardTitle>{title}</CardTitle>
        <EventDropdown
          deleteEvent={deleteEvent}
          eventData={eventData}
          onEdit={onEdit}
        />
      </CardFooter>
      <CardContent>
        <CardDescription>{image}</CardDescription>
        <CardDescription>{description}</CardDescription>
        <div className="flex justify-between">
          <CardDescription>
            {" "}
            {eventData?.date
              ? //@ts-expect-error: error
                dayjs(eventData?.date?.seconds * 1000).format(
                  "dddd, MMMM D, YYYY"
                )
              : "No Deadline"}
          </CardDescription>
          <CardDescription>{location}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
