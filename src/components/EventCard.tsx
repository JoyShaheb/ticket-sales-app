import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EventCard = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Name of Event</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>description</CardDescription>
        <img />
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>Date</CardDescription>
        <CardDescription>Location</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
