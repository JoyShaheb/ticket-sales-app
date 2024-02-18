import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import EventDropdown from "./EventDropdown";
import { IEventDataToUpdate, iExtendedEventType } from "@/types/interface";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "./ui/button";

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

  const navigate = useNavigate();

  const handleGetTicketClick = () => {
    navigate(`/events/${id}`);
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
                dayjs(eventData?.date?.seconds * 1000).format("MMMM D, YYYY")
              : "No Deadline"}
          </CardDescription>
          <CardDescription>{location}</CardDescription>
        </div>
      </CardContent>
      <Button variant={"ghost"} onClick={handleGetTicketClick}>
        Get Ticket
      </Button>
    </Card>
  );
};

export default EventCard;
