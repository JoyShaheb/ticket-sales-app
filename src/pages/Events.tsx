import EventCard from "@/components/EventCard";
import EventForm from "@/components/Form/EventForm";
import EventModal from "@/components/Modal/EventModal";
import {
  useGetAllEventsQuery,
  useCreateOneEventMutation,
  useDeleteOneEventMutation,
  useEditOneEventMutation,
  RootState,
} from "@/store";
import { IEventsProps } from "@/types/interface";
import { NewEventType } from "@/types/types";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Events = () => {
  const userID = useSelector((state: RootState) => state.user.uid);
  const initialState: NewEventType = {
    date: new Date(),
    description: "",
    title: "",
    location: "",
    image: "",
    userOwner: userID,
  };
  const [newEvent, setNewEvent] = useState<NewEventType>(initialState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });

  const onDateChange = (date: Date) => setNewEvent({ ...newEvent, date });

  const { data, isError, isFetching, isLoading } = useGetAllEventsQuery({
    userID,
  });

  const [editOneEvent] = useEditOneEventMutation();
  const [deleteOneEvent] = useDeleteOneEventMutation();
  const [createOneEvent] = useCreateOneEventMutation();

  const deleteEvent = async (id: string) =>
    toast.promise(deleteOneEvent({ id }).unwrap(), {
      loading: "Deleting Event...",
      success: "Event deleted successfully",
      error: "Error deleting Event",
    });

  const onSubmit: () => Promise<void> = async () => {
    try {
      toast.promise(
        createOneEvent(newEvent)
          .unwrap()
          .then(() => setNewEvent(initialState)),
        {
          loading: "Creating Event...",
          success: "Event created successfully",
          error: "Error creating Event",
        }
      );
    } catch (error) {}
  };

  const onEdit = async (data: IEventsProps) => {
    toast.promise(
      editOneEvent(data)
        .unwrap()
        .then(() => setNewEvent(initialState)),
      {
        loading: "Updating Event...",
        success: "Event updated successfully",
        error: "Error updating Event",
      }
    );
  };

  if (isLoading || isFetching) {
    return <div className="">Loading please wait....</div>;
  }
  if (isError) {
    return <div className="">Error, please try again</div>;
  }
  return (
    <div className="flex flex-col gap-5">
      {/* Modal */}
      <div className="flex justify-center">
        <EventModal
          onConfirm={onSubmit}
          buttonText="Add Event"
          dialogueDescription="Create your Event here. Click Create when you're done."
          dialogueTitle="Create New Event"
          confirmButtonText="Create"
        >
          <EventForm
            {...newEvent}
            handleInput={handleInput}
            onDateChange={onDateChange}
          />
        </EventModal>
      </div>

      {data?.map((event: IEventsProps) => (
        <EventCard
          key={event.id}
          userOwner={event.userOwner}
          // @ts-ignore
          date={
            event.date
              ? // @ts-ignore
                dayjs(event?.date?.seconds * 1000).format("dddd, MMMM D, YYYY")
              : "No Deadline"
          }
          description={event.description}
          title={event.title}
          location={event?.location}
          image={event?.image}
          //@ts-ignore
          deleteEvent={() => deleteEvent(event?.id)}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default Events;
