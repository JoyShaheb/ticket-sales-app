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

export interface IUpdateUser
  extends Pick<IProfileData, "phoneNumber" | "photoURL"> {
  name: string;
}

export interface IEventsProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  userOwner: string;
}
