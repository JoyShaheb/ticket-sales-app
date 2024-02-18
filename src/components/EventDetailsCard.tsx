import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { IEventsProps } from "@/types/interface";
import { Input } from "@/components/ui/input";

const EventDetailsCard = ({
  date,
  id,
  description,
  title,
  location,
  image,
  userOwner,
}: IEventsProps) => {
  const eventData: IEventsProps = {
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
        <CardDescription>
          {" "}
          {eventData?.date
            ? //@ts-expect-error: error
              dayjs(eventData?.date?.seconds * 1000).format("MMMM D, YYYY")
            : "No Deadline"}
        </CardDescription>
        <CardDescription>{location}</CardDescription>
      </CardFooter>
      <CardContent>
        <CardDescription>IMAGE{image}</CardDescription>
        <CardDescription>{description}</CardDescription>
      </CardContent>

      <CardDescription>$ Price</CardDescription>
      <CardFooter className="flex justify-between">
        <Input type="number" placeholder="0" />
        <Button variant={"ghost"} onClick={handleGetTicketClick}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventDetailsCard;
