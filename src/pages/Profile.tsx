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
import { toast } from "sonner";
import EditProfileDialog from "@/components/EditProfileDialog";
import ProfileSkeleton from "@/components/Skeleton/ProfileSkeleton";

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

  if (isFetching || isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return <div className="">Error occurred, please try again</div>;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    toast.promise(updateProfile(data as IProfileData).unwrap(), {
      loading: "Updating Profile...",
      success: "Profile Updated Successfully",
      error: "Error Updating Profile",
    });
  };

  return (
    <div>
      <h3>Welcome {data?.fullName}</h3>
      <p>Email: {data?.email}</p>
      <img
        className="mb-3"
        style={{
          width: "120px",
          height: "120px",
        }}
        src={data?.photoURL ? data?.photoURL : "blank-profile-picture.png"}
        alt=""
      />
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
