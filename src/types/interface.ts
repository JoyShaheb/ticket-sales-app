export interface IProfileData {
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  photo: string;
}

export interface IUserAuthData {
  email: string;
  password: string;
}

export type InputChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type HTMLFormChangeEventType = React.FormEvent<HTMLFormElement>;

export interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: InputChangeEventType) => void;
  placeholder: string;
  required?: boolean;
}
