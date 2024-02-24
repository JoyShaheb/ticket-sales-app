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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import BookmarkComponent from "./BookmarkComponent";

const EventCard = ({
  date,
  id,
  description,
  title,
  location,
  image,
  deleteEvent,
  onEdit,
}: iExtendedEventType) => {
  const eventData: IEventDataToUpdate = {
    id,
    date,
    description,
    title,
    location,
    image,
  };

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!user.uid;

  const userID = user.uid;

  const handleGetTicketClick = () => {
    navigate(`/events/${id}`);
  };

  const userRole = user.userRole;

  return (
    <Card className="w-[350px]">
      <CardFooter className="flex justify-between">
        <CardTitle>{title}</CardTitle>
        {userRole === "admin" && (
          <EventDropdown
            deleteEvent={deleteEvent}
            eventData={eventData}
            onEdit={onEdit}
          />
        )}
      </CardFooter>
      <CardContent>
        <CardDescription>{image}</CardDescription>
        <CardDescription>{description}</CardDescription>
        <div className="flex justify-between">
          <CardDescription>
            {eventData?.date
              ? //@ts-expect-error: error
                dayjs(eventData?.date?.seconds * 1000).format("MMMM D, YYYY")
              : "No Deadline"}
          </CardDescription>
          <CardDescription>{location}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={"ghost"} onClick={handleGetTicketClick}>
          Get Ticket
        </Button>
        {isAuthenticated ? (
          <BookmarkComponent
            userID={userID}
            eventID={id}
            id={id}
            isAuthenticated={isAuthenticated}
          />
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
