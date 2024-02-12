import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewEventType } from "@/types/types";

const EventCard = ({ date, description, title }: NewEventType) => {
  const formattedDate = date.toLocaleDateString(); // Adjust the formatting as needed

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <img />
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>{formattedDate}</CardDescription>
        <CardDescription>Location</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
