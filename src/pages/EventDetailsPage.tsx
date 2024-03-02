import { useParams } from "react-router-dom";
import { useGetOneEventQuery } from "@/store";
import EventDetailsCard from "@/components/EventDetailsCard";
import EventSkeleton from "@/components/Skeleton/EventSkeleton";

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: event,
    isError,
    isLoading,
  } = useGetOneEventQuery(
    {
      id: id || "",
    },
    {
      skip: !id,
    }
  );

  if (!id) {
    return <div className="">Event ID not provided</div>;
  }

  if (isLoading) {
    return <EventSkeleton />;
  }

  if (isError) {
    console.error("Error fetching event details:", isError);
    return (
      <div className="">Error fetching event details, please try again</div>
    );
  }

  if (!event) {
    return <div className="">Event not found</div>;
  }

  return (
    <div>
      <EventDetailsCard {...event} />
    </div>
  );
};

export default EventDetailsPage;
