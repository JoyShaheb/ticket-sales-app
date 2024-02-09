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
import { ChangeEvent, MouseEventHandler } from "react";
// import InputFieldWithLabel from "./Form/InputFieldWithLabel";

interface EditProfileDialogProps {
  // eslint-disable-next-line no-unused-vars
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void; // Change type to ChangeEvent
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
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
          {/* <InputFieldWithLabel
            name={displayName}
            label={"User Name"}
            type={"text"}
            placeholder={"Your User Name here..."}
          /> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-right">
              User Name
            </Label>
            <Input
              name="displayName"
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
              name="fullName"
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
              name="email"
              value={email}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Adress
            </Label>
            <Input
              name="address"
              value={address}
              className="col-span-3"
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              name="phoneNumber"
              value={phoneNumber}
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
              name="photoURL"
              value={photoURL}
              className="col-span-3"
              onChange={handleInputChange}
              type="file"
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
