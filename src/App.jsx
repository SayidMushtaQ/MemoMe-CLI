import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Verify from "./pages/otp.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./middleware/authenticateUser.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import SentVerification from "./pages/sent-verification.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/verify" element={<Verify />} />
          <Route element={<PrivateRoute />}>
            <Route path="/sent-verify" element={<SentVerification />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
