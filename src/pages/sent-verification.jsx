import { useState } from "react";
import { sendVerifyCode } from "../util/sendVerifyCode";
import { useAuth } from "../hook/useAuth";
import { SuccessNotify } from "../util/notify";
import { useNavigate } from "react-router-dom";
import "../styles/send-verification.css";
export default function SendVerification() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    setLoading(true);
    const { otpRes } = await sendVerifyCode(user.email);
    if (otpRes.ok) {
      setLoading(false);
      localStorage.setItem("user_email", user.email);
      SuccessNotify("OTP has been sent to your email successfully");
      return navigate("/verify");
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
    <div className="container-otp">
      <section className="content-otp">
        <p className="message">
          It looks like you haven&apos;t verified your <b>{user.email}</b>{" "}
          Please verify your email to proceed.
        </p>
        <button className="button" onClick={() => handleSend()}>
          Send OTP
        </button>
      </section>
    </div>
  );
}
