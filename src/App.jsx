import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx";
import Verify from "./pages/otp.jsx";
import Home from "./pages/Home.jsx"
function App() {

  return (
    <div>
     <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />  
                <Route path="/register" element={<Register />} ></Route>
                <Route path="/verify" element={<Verify/>} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
        <ToastContainer/>
    </div>
  );
}

export default App
