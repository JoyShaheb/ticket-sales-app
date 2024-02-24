import {
  logoutSuccess,
  useLogoutMutation,
  RootState,
  useGetProfileDataQuery,
  useUpdateUserProfileMutation,
} from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IProfileData } from "@/types/interface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EditProfileDialog from "@/components/EditProfileDialog";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const appSignout = async () => {
    try {
      dispatch(logoutSuccess());
      toast.promise(logout(null).unwrap(), {
        loading: "Logging out...",
        success: "Logout successful",
        error: "Logout failed",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const userId = useSelector((state: RootState) => state.user.uid);
  const {
    data: profileData,
    isError,
    isFetching,
    isLoading,
  } = useGetProfileDataQuery({
    userId,
  });

  const [data, setData] = useState<IProfileData>({
    uid: userId,
    displayName: "",
    fullName: "",
    email: "",
    photoURL: "",
    phoneNumber: "",
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
    return <div className="">Loading, please wait....</div>;
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
