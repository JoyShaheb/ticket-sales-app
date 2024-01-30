import {
  useConfirmEmailVerificationMutation,
  changeEmailVeificationStatus,
} from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const VerifyEmailRequest = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const oobCode = new URLSearchParams(window.location.search).get(
    "oobCode"
  ) as string;

  // const continueUrl = new URLSearchParams(window.location.search).get(
  //   "continueUrl"
  // ) as string;

  const [confirmEmailVerification, { isError, isLoading, isSuccess }] =
    useConfirmEmailVerificationMutation();

  useEffect(() => {
    confirmEmailVerification({
      oobCode,
    })
      .then(() => dispatch(changeEmailVeificationStatus(true)))
      .then(() => navigate("/"));
  }, []);

  if (isLoading) {
    return <div className="">Verifying your email please wait.......</div>;
  }

  if (isError) {
    return (
      <div className="">Email verification failed, please try again.......</div>
    );
  }

  if (isSuccess) {
    return (
      <div className="">
        Email Verification Successful, redirecting you to dashboard........
      </div>
    );
  }

  return <div>VerifyEmailRequest Page</div>;
};

export default VerifyEmailRequest;
