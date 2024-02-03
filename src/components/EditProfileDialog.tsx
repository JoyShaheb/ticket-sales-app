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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent } from "react";

interface EditProfileDialogProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void; // Change type to ChangeEvent
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  displayName: string;
  fullName: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
  address: string;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  handleInputChange,
  handleSubmit,
  displayName,
  fullName,
  email,
  photoURL,
  phoneNumber,
  address,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-right">
              Display Name
            </Label>
            <Input
              id="displayName"
              value={displayName}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photoURL" className="text-right">
              Photo
            </Label>
            <Input
              id="photoURL"
              value={photoURL}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Photo
            </Label>
            <Input
              id="address"
              value={address}
              className="col-span-3"
              onChange={handleInputChange}
              type="file"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
