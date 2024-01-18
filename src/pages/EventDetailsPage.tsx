import {
  // useEffect,
  useState,
} from "react";
import InputFieldWithLabel from "@/components/Form/InputFieldWithLabel";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { IProfileData } from "@/types/interface";

const EventDetailsPage = () => {
  // const userId = useSelector((state: RootState) => state.user.uid);
  const email = useSelector((state: RootState) => state.user.email);
  // const {
  //   data: profileData,
  //   isLoading,
  //   isFetching,
  //   isError,
  // } = useGetProfileDataQuery({
  //   userId,
  // });

  const [data] = useState<IProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    photo: "",
    uid: "",
    email: "",
    address: "",
  });

  // useEffect(() => {
  //   setData(profileData as IProfileData);
  // }, [profileData]);

  // const [updateProfile] = useUpdateUserProfileMutation();

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // if (isLoading || isFetching)
  //   return <div className="text-3xl text-center my-5">Loading...</div>;

  // if (isError) return <div>Error...</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-7 items-center justify-center h-[90vh]">
      <div className="">
        <h1 className="text-center text-2xl font-bold">Profile Details</h1>
        <h6 className="opacity-[0.6] text-center font-light">{email}</h6>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
        }}
        className="flex flex-col gap-3 max-w-[400px]"
      >
        <InputFieldWithLabel
          name="displayName"
          // onChange={handleInputChange}
          placeholder="Display Name"
          type="text"
          value={data?.username}
          label="Display Name"
        />
        <InputFieldWithLabel
          name="firstName"
          // onChange={handleInputChange}
          placeholder="Your First Name"
          type="text"
          value={data?.firstName}
          label="First Name"
        />
        <InputFieldWithLabel
          name="lastName"
          // onChange={handleInputChange}
          placeholder="Your Last Name"
          type="text"
          value={data?.lastName}
          label="Last Name"
        />
        <InputFieldWithLabel
          name="phone"
          // onChange={handleInputChange}
          placeholder="Your Phone Number"
          type="text"
          value={data?.phone}
          label="Phone Number"
        />
        <Button type="submit">Save Profile Details</Button>
      </form>
    </div>
  );
};

export default EventDetailsPage;
