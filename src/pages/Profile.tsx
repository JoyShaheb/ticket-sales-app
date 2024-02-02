import {
  logoutSuccess,
  useLogoutMutation,
  RootState,
  useGetProfileDataQuery,
} from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IProfileData } from "@/types/interface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  if (isFetching || isLoading) {
    return <div className="">Loading, please wait....</div>;
  }

  if (isError) {
    return <div className="">Error occurred, please try again</div>;
  }

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
        src={
          data?.photoURL ? data?.photoURL : "public/blank-profile-picture.png"
        }
        alt=""
      />
      <br />
      <Button variant="default" onClick={appSignout}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
