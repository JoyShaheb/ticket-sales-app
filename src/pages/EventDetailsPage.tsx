import { useParams } from "react-router-dom";
import { useGetOneEventQuery, RootState } from "@/store";
import { useSelector } from "react-redux";
import EventDetailsCard from "@/components/EventDetailsCard";
import EventSkeleton from "@/components/Skeleton/EventSkeleton";

const EventDetailsPage = () => {
  const userID = useSelector((state: RootState) => state.user.uid);
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
    userID,
  });

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
