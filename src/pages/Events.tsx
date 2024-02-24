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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Events = () => {
  const initialState: NewEventType = {
    date: new Date(),
    description: "",
    title: "",
    location: "",
    image: "",
  };

  const userRole = useSelector((state: RootState) => state.user.userRole);
  console.log("role", userRole);

  const [newEvent, setNewEvent] = useState<NewEventType>(initialState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });

  const onDateChange = (date: Date) => setNewEvent({ ...newEvent, date });

  const { data, isError, isFetching, isLoading } = useGetAllEventsQuery();

  const [editOneEvent] = useEditOneEventMutation();
  const [deleteOneEvent] = useDeleteOneEventMutation();
  const [createOneEvent] = useCreateOneEventMutation();

  const deleteEvent = async (id: string): Promise<void> => {
    toast.promise(deleteOneEvent({ id }).unwrap(), {
      loading: "Deleting Event...",
      success: "Event deleted successfully",
      error: "Error deleting Event",
    });
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = async (data: IEventsProps) => {
    // .then(() => setNewEvent(initialState))
    toast.promise(editOneEvent(data).unwrap(), {
      loading: "Updating Event...",
      success: "Event updated successfully",
      error: "Error updating Event",
    });
  };

  if (isLoading || isFetching) {
    return <div className="">Loading please wait....</div>;
  }
  if (isError) {
    return <div className="">Error, please try again</div>;
  }
  return (
    <>
      {/* Modal */}
      <div className="flex justify-center mb-6">
        {userRole === "admin" && (
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
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 justify-center">
        {data?.map((event: IEventsProps) => (
          <EventCard
            key={event.id}
            {...event}
            deleteEvent={() => deleteEvent(event.id)}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
};

export default Events;
