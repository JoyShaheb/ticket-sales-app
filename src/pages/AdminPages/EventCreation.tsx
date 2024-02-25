// import EventForm from "@/components/Form/EventForm";
// import EventModal from "@/components/Modal/EventModal";
// import {
//   useGetAllEventsQuery,
//   useCreateOneEventMutation,
//   useDeleteOneEventMutation,
//   useEditOneEventMutation,
//   RootState,
// } from "@/store";
// import { IEventsProps } from "@/types/interface";
// import { NewEventType } from "@/types/types";

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";

// const EventCreation = () => {
//   const userID = useSelector((state: RootState) => state.user.uid);
//   const initialState: NewEventType = {
//     date: new Date(),
//     description: "",
//     location: "",
//     image: "",
//     title: "",
//     userOwner: userID,
//   };
//   const [newTask, setNewTask] = useState<NewEventType>(initialState);

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setNewTask({
//       ...newTask,
//       [e.target.name]: e.target.value,
//     });

//   const onDateChange = (date: Date) => setNewTask({ ...newTask, date });

//   const { data, isError, isFetching, isLoading } = useGetAllEventsQuery({
//     userID,
//   });

//   const [editOneTask] = useEditOneEventMutation();
//   const [deleteOneTask] = useDeleteOneEventMutation();
//   const [createOneTask] = useCreateOneEventMutation();

//   const deleteTask = async (id: string) =>
//     toast.promise(deleteOneTask({ id }).unwrap(), {
//       loading: "Deleting task...",
//       success: "Task deleted successfully",
//       error: "Error deleting task",
//     });

//   const onSubmit: () => Promise<void> = async () => {
//     try {
//       const result = await toast.promise(
//         createOneTask(newTask)
//           .unwrap()
//           .then(() => setNewTask(initialState)),
//         {
//           loading: "Creating task...",
//           success: "Task created successfully",
//           error: "Error creating task",
//         }
//       );

//       // Assuming toast.promise resolves with the result you want to handle
//       // If it's not a promise, you might need to handle it differently
//       console.log(result);
//     } catch (error) {
//       // Handle errors if any
//       console.error(error);
//     }
//   };

//   const onEdit = async (data: IEventsProps) => {
//     toast.promise(
//       editOneTask(data)
//         .unwrap()
//         .then(() => setNewTask(initialState)),
//       {
//         loading: "Updating task...",
//         success: "Task updated successfully",
//         error: "Error updating task",
//       }
//     );
//   };

//   if (isLoading || isFetching) {
//     return <div className="">Loading please wait....</div>;
//   }
//   if (isError) {
//     return <div className="">Error, please try again</div>;
//   }
//   return (
//     <div className="flex flex-col gap-5">
//       {/* Modal */}
//       <div className="flex justify-center">
//         <EventModal
//           onConfirm={onSubmit}
//           buttonText="Add Event"
//           dialogueDescription="Create your Event here. Click Create when you're done."
//           dialogueTitle="Create New Task"
//           confirmButtonText="Create"
//         >
//           <EventForm
//             {...newTask}
//             handleInput={handleInput}
//             onDateChange={onDateChange}
//           />
//         </EventModal>
//       </div>
//       {/* Table */}
//       {/* <Table className="w-full rounded-md border">
//     <TableHeader>
//       <TableRow>
//         <TableHead className="w-[150px]">Task</TableHead>
//         <TableHead className="w-[240px]">Deadline</TableHead>
//         <TableHead className="w-[150px]">Status</TableHead>
//         <TableHead className="col-span-9">Description</TableHead>
//       </TableRow>
//     </TableHeader>
//     <TableBody>
//       {data?.map((task: ITaskProps) => {
//         return (
//           <TableRow key={task?.id}>
//             <TableCell>{task?.title}</TableCell>
//             <TableCell>
//               {task?.deadline
//                 ? // @ts-ignore
//                 dayjs(task?.deadline?.seconds * 1000).format(
//                   "dddd, MMMM D, YYYY",
//                 )
//                 : "No Deadline"}
//             </TableCell>
//             <TableCell>{task?.status}</TableCell>
//             <TableCell className="flex gap-2 items-center">
//               <Button variant="outline" size="sm" className="text-xs">
//                 {task?.label ? task?.label : "No Label"}
//               </Button>
//               {task?.description}
//             </TableCell>
//             <TableCell>
//               <TaskDropdown
//                 deleteTask={() => deleteTask(task?.id)}
//                 taskData={task}
//                 onEdit={onEdit}
//               />
//             </TableCell>
//           </TableRow>
//         );
//       })}
//     </TableBody>
//   </Table> */}
//     </div>
//   );
// };

// export default EventCreation;

const EventCreation = () => {
  return <div>EventCreation</div>;
};

export default EventCreation;
