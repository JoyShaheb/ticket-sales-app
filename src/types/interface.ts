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

export interface IUserSignInData {
  email: string;
  password: string;
}

export interface IUpdateUser {
  name: string;
  photoURL: string;
  phoneNumber: string;
}
