import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const userRole = useSelector((state: RootState) => state.user.userRole);
  return userRole === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
