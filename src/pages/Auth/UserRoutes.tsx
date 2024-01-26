import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const UserRoutes = () => {
  const uid = useSelector((state: RootState) => state.user.uid);
  return uid ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoutes;
