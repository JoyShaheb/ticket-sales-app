import { logoutSuccess } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { IProfileData } from "@/types/interface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [logout] = useLogoutMutation();

  const appSignout = async () => {
    dispatch(logoutSuccess());
  };
  const userId = useSelector((state: RootState) => state.user.uid);
  // const {
  //   data: profileData,
  //   isError,
  //   isFetching,
  //   isLoading,
  // } = useGetProfileDataQuery({
  //   userId,
  // });

  const [data, setData] = useState<IProfileData>({
    uid: userId,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
  });

  // useEffect(() => {
  //   setData(profileData as IProfileData);
  // }, [profileData]);

  // if (isFetching || isLoading) {
  //   return <div className="">Loading, please wait....</div>;
  // }

  // if (isError) {
  //   return <div className="">Error occured please try again</div>;
  // }

  return (
    <div>
      <h3>Welcome {data?.firstName}</h3>
      <p>Email: {data?.email}</p>
      <img
        className="mb-3"
        style={{
          width: "120px",
          height: "120px",
        }}
        src={data?.photo ? data?.photo : "/images/blank-profile-picture.svg"}
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
