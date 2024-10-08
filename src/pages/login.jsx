import { Link } from "react-router-dom";
import "../styles/Signin.css";
import signin from "../image/main_2.jpg";
import { useState } from "react";
import { validate } from "../helper/signinValidate.js";
import { ErrorNotify, SuccessNotify } from "../util/notify.js";
import { useAuth } from "../hook/useAuth.js";
import {useNavigate} from 'react-router-dom'
export default function Signin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userIdentifier: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const validationError = validate(formData);
    if (!Object.keys(validationError).length) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
         credentials: 'include'
        });
        if (!res.ok) {
          setLoading(false);
          return ErrorNotify("Something went wrong during LOGIN,try again.");
        }
        const data = await res.json();
        if (data.success) {
          setUser(data.data)
          localStorage.setItem('authToken',data.data.token)
          setLoading(false);
          navigate('/')
          return SuccessNotify("User loged in successfully 🚀🥳");
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        return ErrorNotify(
          "An error occurred while creating the user. Please try again 🫡🫠"
        );
      }
    } else {
      Object.values(validationError).forEach((error) => ErrorNotify(error));
    }
  };
  if (loading) {
    return (
      <div
        className="loading"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>Loading. . . 😴</span>
      </div>
    );
  }
  return (
    <>
      <div className="body">
        <div className="container">
          <div className="image-container">
            <img src={signin} alt="" />
          </div>
          <div className="signin">
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>{" "}
                Username or email
              </label>
              <input
                type="text"
                id="userIdentifier"
                name="userIdentifier"
                placeholder="Enter your name"
                onChange={handleChange}
              />

              <label htmlFor="password">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                </svg>
                &nbsp; Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

             <div style={{marginBottom:'20px'}}>
              <Link to={'/sent-uri'}>Forgot password</Link>
             </div>

              <button type="submit">Log in</button>
            </form>
            <div className="account">
              {/* <p><a href="#">Create an account</a></p> */}
              <p>
                <Link to={"/register"} id="SignUp">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
