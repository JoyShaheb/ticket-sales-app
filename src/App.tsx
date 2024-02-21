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
  VerifyEmail,
  UrlReRoute,
  VerifyEmailRequest,
} from "./pages";
import { AdminDashboard, EventCreation } from "./pages/AdminPages/";
import Sidebar from "./components/SideBar/Sidebar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
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
        return;
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
          {/* this route is used to process email verification request */}
          <Route
            path="/verify-email-request"
            element={<VerifyEmailRequest />}
          />
          <Route path="/url-reroute" element={<UrlReRoute />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Reset and forgot belongs to general pages because both auth and non-auth users can use these services */}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* this route is used to send verify email request */}
          <Route path="/verify-email" element={<VerifyEmail />} />

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
