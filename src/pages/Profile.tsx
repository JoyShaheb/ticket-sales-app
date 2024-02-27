import {
  useLogoutMutation,
  RootState,
  useGetProfileDataQuery,
  useUpdateUserProfileMutation,
} from "@/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IProfileData } from "@/types/interface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import EditProfileDialog from "@/components/EditProfileDialog";
import UserProfilePicture from "@/components/Gallery/UserProfilePicture";

const Profile = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const appSignout = async () =>
    await logout()
      .unwrap()
      .then(() => navigate("/login"));

  const user = useSelector((state: RootState) => state.user);
  const {
    data: profileData,
    isError,
    isFetching,
    isLoading,
  } = useGetProfileDataQuery({
    userId: user.uid,
  });

  const [data, setData] = useState<IProfileData>({
    uid: user?.uid,
    displayName: user?.displayName,
    fullName: "",
    email: user?.email,
    photoURL: user?.photoURL,
    phoneNumber: user?.phoneNumber,
    address: "",
  });

  useEffect(() => {
    if (profileData) {
      setData(profileData as IProfileData);
    }
  }, [profileData]);

  const [updateProfile] = useUpdateUserProfileMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await updateProfile(data as IProfileData).unwrap();
  };

  if (isFetching || isLoading) {
    return <div className="">Loading, please wait....</div>;
  }

  if (isError) {
    return <div className="">Error occurred, please try again</div>;
  }

  return (
    <div>
      <UserProfilePicture user={user} />
      <h3>Welcome {data?.fullName}</h3>
      <p>Email: {data?.email}</p>
      <br />
      <Button variant={"outline"} onClick={appSignout}>
        Logout
      </Button>
      <br />
      <br />
      <EditProfileDialog
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        {...data}
      />
    </div>
  );
};

export default Profile;
