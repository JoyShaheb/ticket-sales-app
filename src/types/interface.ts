import { ChangeEvent, MouseEventHandler } from "react";
import { NewEventType } from "./types";

export interface IProfileData {
  uid: string;
  displayName: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  photoURL: string;
}

export interface IUserSignInData {
  email: string;
  password: string;
}

export interface IUpdateUser {
  name: string;
  photoURL: string;
  phoneNumber: string;
}

export interface IEventsProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  userOwner?: string;
  location: string;
  image: string;
}

export interface IEditProfileDialogProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void; // Change type to ChangeEvent
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  displayName: string;
  fullName: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
  address: string;
}

export interface IEditEventDialogProps {
  icon: React.ReactNode;
  eventData: IEventsProps;
  onEdit: (updatedData: IEventDataToUpdate) => Promise<void>;
}

export interface iExtendedEventType extends NewEventType {
  id: string;
  deleteEvent: (id: string) => Promise<void>;
  onEdit: (eventData: IEventsProps) => Promise<void>;
}

export interface IEventDataToUpdate {
  title: string;
  description: string;
  date: Date;
  location: string;
  image: string;
  userOwner?: string;
  id: string;
}

export interface IExtendedEventType {
  deleteEvent: (id: string) => Promise<void>;
  eventData: IEventsProps;
  onEdit: (eventData: IEventDataToUpdate) => Promise<void>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date) => void;
}

export interface IDatePicker {
  value: Date;
  setvalue: (value: Date) => void;
}

export interface IEventsForm {
  title: string;
  date: Date;
  description: string;
  location: string;
  image?: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date) => void;
}

export interface iInputFieldProps {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}

export interface IDeleteEventModalProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onConfirm: (id: string) => Promise<void>;
}
