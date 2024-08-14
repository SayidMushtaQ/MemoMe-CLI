import { useState } from "react";
import "../styles/forgot-password.css";
import { ErrorNotify, SuccessNotify } from "../util/notify";
import { useNavigate, useParams } from "react-router-dom";
export const ValidatePassword = (password) => {
  let newPasswordError = {};
  if (!password) {
    newPasswordError.password = "Password is required";
  } else if (password.length < 6) {
    newPasswordError.password = "Password should be at least 6 characters long";
  }
  return newPasswordError;
};
export default function SentURIResetPassword() {
  const [newPassword, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {token} = useParams();
  async function handleSubmit() {
    try {
      const validateError = ValidatePassword(newPassword);
      if (!Object.keys(validateError).length) {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/${token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword }),
            credentials: "include",
          }
        );
        if (!res.ok) {
          setLoading(false);
          return ErrorNotify("Something went wrong. Please try again 🫡");
        } else {
          setLoading(false);
          SuccessNotify("Add new password successfully 👍");
          return navigate('/login')
        }
      } else {
        Object.values(validateError).forEach((error) => ErrorNotify(error));
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      return ErrorNotify(
        "An error occurred while reset password. Please try again 🫡🫠"
      );
    }
  }
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
    <div className="reset-main-container">
      <div className="reset-container">
        <form onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <input
            type="password"
            id="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            value={newPassword}
          />
          <button>Reset Password</button>
        </form>
      </div>
    </div>
  );
}
