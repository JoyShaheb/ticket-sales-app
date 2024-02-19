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
    <div className="flex flex-col items-center justify-center min-h-[95vh] space-y-3">
      <Card className="w-[750px] h-[500px]">
        <CardFooter className="flex justify-between mt-5">
          <CardTitle>{title}</CardTitle>
          <div className="flex space-x-4">
            <CardDescription>
              {eventData?.date
                ? //@ts-expect-error: error
                  dayjs(eventData?.date?.seconds * 1000).format("MMMM D, YYYY")
                : "No Deadline"}
            </CardDescription>
            <CardDescription>{location}</CardDescription>
          </div>
        </CardFooter>
        <CardContent>
          <div className="flex justify-between mt-5">
            {/* Left Column - Image */}
            <div className="flex-shrink-0 mr-4 w-[300px]">
              <CardDescription>
                <img
                  className="h-[200px] w-[300px] "
                  src={eventData?.image ? eventData?.image : "public/event.jpg"}
                />
              </CardDescription>
            </div>

            {/* Right Column - Description */}
            <div className="flex-grow">
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardContent>

        <div className="mt-7">
          <CardDescription className="ml-5 mb-3">$ Price</CardDescription>
          <CardFooter className="flex justify-between w-[200px]">
            <Input className="w-[70px]" type="number" placeholder="0" />
            <Button variant={"ghost"} onClick={handleGetTicketClick}>
              Add to Cart
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default EventDetailsCard;
