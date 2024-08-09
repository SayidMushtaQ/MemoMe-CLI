import "../styles/send-verification.css";
import { sendVerifyCode } from "../util/sendVerifyCode";
import { useAuth } from "../hook/useAuth";
import {SuccessNotify} from '../util/notify'
import { useNavigate } from "react-router-dom";
export default function SendVerification() {
  const { user } = useAuth();
  const navigate = useNavigate()
  const handleSend = async () => {
    const { otpRes } = await sendVerifyCode(user.email);
    if (otpRes.ok) {
      localStorage.setItem("user_email", user.email);
      SuccessNotify("OTP has been sent to your email successfully");
      return navigate('/verify')
    }
  };

  return (
    <div className="container-otp">
      <section className="content-otp">
        <p className="message">
          It looks like you haven&apos;t verified your <b>{user.email}</b> Please verify your
          email to proceed.
        </p>
        <button className="button" onClick={() => handleSend()}>
          Send OTP
        </button>
      </section>
    </div>
  );
}
