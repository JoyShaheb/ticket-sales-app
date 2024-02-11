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
  const userID = useSelector((state: RootState) => state.user.uid);
  const initialState: NewEventType = {
    date: new Date(),
    description: "",
    title: "",
    userOwner: userID,
  };
  const [newEvent, setNewEvent] = React.useState<NewEventType>(initialState);

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
      const result = await toast.promise(
        createOneEvent(newEvent)
          .unwrap()
          .then(() => setNewEvent(initialState)),
        {
          loading: "Creating Event...",
          success: "Event created successfully",
          error: "Error creating Event",
        }
      );
      // Assuming toast.promise resolves with the result you want to handle
      // If it's not a promise, you might need to handle it differently
      console.log(result);
    } catch (error) {
      // Handle errors if any
      console.error(error);
    }
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
      <EventCard />

      {/* Table */}
      {/* <Table className="w-full rounded-md border">
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px]">Event</TableHead>
        <TableHead className="w-[240px]">Deadline</TableHead>
        <TableHead className="w-[150px]">Status</TableHead>
        <TableHead className="col-span-9">Description</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data?.map((Event: IEventProps) => {
        return (
          <TableRow key={Event?.id}>
            <TableCell>{Event?.title}</TableCell>
            <TableCell>
              {Event?.deadline
                ? // @ts-ignore
                dayjs(Event?.deadline?.seconds * 1000).format(
                  "dddd, MMMM D, YYYY",
                )
                : "No Deadline"}
            </TableCell>
            <TableCell>{Event?.status}</TableCell>
            <TableCell className="flex gap-2 items-center">
              <Button variant="outline" size="sm" className="text-xs">
                {Event?.label ? Event?.label : "No Label"}
              </Button>
              {Event?.description}
            </TableCell>
            <TableCell>
              <EventDropdown
                deleteEvent={() => deleteEvent(Event?.id)}
                EventData={Event}
                onEdit={onEdit}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table> */}
    </div>
  );
};

export default Events;
