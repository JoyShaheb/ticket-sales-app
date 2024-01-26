import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthStateRoute = () => {
  const uid: string = useSelector((state: RootState) => state.user.uid);
  return uid ? <Navigate to="/user" /> : <Outlet />;
};

export default AuthStateRoute;
