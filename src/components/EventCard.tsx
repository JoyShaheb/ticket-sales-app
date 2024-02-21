import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import EventDropdown from "./EventDropdown";
import {
  IEventsProps,
  ISecondsDate,
  iExtendedEventType,
} from "@/types/interface";
import dayjs from "dayjs";
import { useState } from "react";

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
  const [data, setData] = useState<IEventsProps>({
    id,
    date,
    description,
    title,
    location,
    image,
    userOwner,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const onDateChange = (date: Date | number | ISecondsDate) => {
    const parsedDate = new Date(date as Date);
    // Convert the parsed date to the format expected by your database
    const databaseFormat = {
      nanoseconds: parsedDate.getMilliseconds() * 1e6, // Convert milliseconds to nanoseconds
      seconds: Math.floor(parsedDate.getTime() / 1000), // Convert milliseconds to seconds
    };

    setData({ ...data, date: databaseFormat });
  };

  return (
    <Card className="w-[350px]">
      <CardFooter className="flex justify-between">
        <CardTitle>{title}</CardTitle>
        <EventDropdown
          deleteEvent={deleteEvent}
          eventData={data}
          onEdit={onEdit}
          handleInput={handleInput}
          onDateChange={onDateChange}
        />
      </CardFooter>
      <CardContent>
        <CardDescription>{image}</CardDescription>
        <CardDescription>{description}</CardDescription>
        <div className="flex justify-between">
          <CardDescription>
            {data?.date
              ? dayjs((data?.date as ISecondsDate)?.seconds * 1000).format(
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
