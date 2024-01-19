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

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
