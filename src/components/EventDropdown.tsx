import { Trash, Pencil, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";
import EditEventDialog from "./EditEventDialog";
import { IEventsProps } from "@/types/interface";
import DeleteModal from "./Modal/DeleteModal";

const EventDropdown: FC<{
  deleteEvent: (id: string) => Promise<string>;
  eventData: IEventsProps;
  onEdit: (data: IEventsProps) => Promise<void>;
}> = ({ deleteEvent, eventData, onEdit }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <DeleteModal
                icon={
                  <div className="flex items-center px-2 py-2 cursor-default hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                    <Trash className="mr-2 h-4 w-4" />
                    <span className="text-[0.875rem]">Delete Event</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </div>
                }
                description="Are you sure you want to delete this task? This action cannot be undone."
                title="Delete Task?"
                onConfirm={deleteEvent}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditEventDialog
                icon={
                  <div className="flex items-center px-2 py-2 cursor-default hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit Event</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </div>
                }
                eventData={eventData}
                onEdit={onEdit}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default EventDropdown;
