import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./pages/Signup.jsx"
import Signin from "./pages/Signin.jsx";
import Verify from "./pages/otp.jsx";
import Home from "./pages/Home.jsx"
function App() {

  return (
    <div>
     <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin/>} />  
                <Route path="/signup" element={<SignUp />} ></Route>
                <Route path="/verify" element={<Verify/>} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
        <ToastContainer/>
    </div>
  );
}

export default App
