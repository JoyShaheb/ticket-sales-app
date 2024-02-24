import { useParams } from "react-router-dom";
import { useGetOneEventQuery } from "@/store";
import EventDetailsCard from "@/components/EventDetailsCard";

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className="">Event ID not provided</div>;
  }

  // Call the hook unconditionally at the top level
  const {
    data: event,
    isError,
    isLoading,
  } = useGetOneEventQuery({
    id,
  });

  if (isLoading) {
    return <div className="">Loading event details...</div>;
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
