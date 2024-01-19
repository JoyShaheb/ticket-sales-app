import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorPage, Login, Signup } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
