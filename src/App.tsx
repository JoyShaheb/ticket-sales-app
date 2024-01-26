import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ErrorPage,
  Login,
  Signup,
  Cart,
  EventDetailsPage,
  Events,
  ForgotPassword,
  Profile,
  ResetPassword,
  Checkout,
  Bookmarks,
} from "./pages";
import { AdminDashboard, EventCreation } from "./pages/AdminPages/";
import Sidebar from "./components/SideBar/Sidebar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { loginSuccess } from "./store";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "./store/Slices/userSlice.ts";
import UserRoutes from "./pages/Auth/UserRoutes.tsx";
import AuthStateRoute from "./pages/Auth/AuthStateRoute.tsx";
import AdminRoutes from "./pages/Auth/AdminRoutes.tsx";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginSuccess({
            uid: user.uid,
            email: user.email as string,
            displayName: user.displayName as string,
            photoURL: user.photoURL as string,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber as string,
            userRole: "admin",
          })
        );
      } else {
        dispatch(logoutSuccess());
      }
    });
  }, []);

  return (
    <Router>
      <Sidebar>
        <Routes>
          {/* General Pages */}
          <Route path="/" element={<Events />} />
          <Route path="/event-details-page" element={<EventDetailsPage />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Reset and forgot belongs to general pages because both auth and non-auth users can use these services */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ! User Pages */}
          <Route element={<UserRoutes />}>
            <Route path="/user" element={<Profile />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* ! Auth State pages */}
          <Route element={<AuthStateRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Admin Pages Route Logic */}
          <Route element={<AdminRoutes />}>
            <Route path="/insights" element={<AdminDashboard />} />
            <Route path="/event-actions" element={<EventCreation />} />
          </Route>
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default App;
