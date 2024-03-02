import EventCard from "@/components/EventCard";
import EventForm from "@/components/Form/EventForm";
import EventModal from "@/components/Modal/EventModal";
import EventSkeleton from "@/components/Skeleton/EventSkeleton";
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

const Events = () => {
  const initialState: NewEventType = {
    date: new Date(),
    description: "",
    title: "",
    location: "",
    image: "",
  };

  const userRole = useSelector((state: RootState) => state.user.userRole);

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

  const deleteEvent = async (id: string) =>
    await deleteOneEvent({ id }).unwrap();

  const onSubmit: () => Promise<void> = async () =>
    await createOneEvent(newEvent)
      .unwrap()
      .then(() => setNewEvent(initialState));

  const onEdit = async (data: IEventsProps) =>
    await editOneEvent(data).unwrap();

  if (isFetching || isLoading) {
    return <EventSkeleton />;
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
