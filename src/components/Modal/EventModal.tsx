import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface EventModalProps {
  button: React.ReactNode;
  onConfirm: () => Promise<void>;
  children: React.ReactNode;
  dialogueTitle: string;
  dialogueDescription: string;
  confirmButtonText: string;
}

const EventModal: FC<EventModalProps> = ({
  onConfirm,
  children,
  button,
  dialogueDescription,
  dialogueTitle,
  confirmButtonText,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          <DialogHeader>
            <DialogTitle>{dialogueTitle}</DialogTitle>
            <DialogDescription>{dialogueDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">{children}</div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              {confirmButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
