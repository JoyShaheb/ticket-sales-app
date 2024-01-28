import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const UserRoutes = () => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const emailVerified = useSelector(
    (state: RootState) => state.user.emailVerified
  );

  if (uid && emailVerified) {
    return <Outlet />;
  }

  if (uid && !emailVerified) {
    return <Navigate to="/verify-email" />;
  }

  return <Navigate to="/login" />;
};

export default UserRoutes;
