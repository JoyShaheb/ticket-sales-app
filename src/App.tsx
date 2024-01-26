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
} from "./pages";
import Sidebar from "./components/SideBar/Sidebar";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { loginSuccess } from "./store";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "./store/Slices/userSlice.ts";

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
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/event-details-page" element={<EventDetailsPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </Router>
  );
};

export default App;
