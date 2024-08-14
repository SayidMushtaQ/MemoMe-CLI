import { useState } from "react";
import { ErrorNotify, SuccessNotify } from "../util/notify";
export default function SentURIResetPassword() {
  const [userIdentifier, setUserIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      if(!userIdentifier){
        return ErrorNotify("Email or userName is required🫠")
      }
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIdentifier }),
        credentials: 'include'
      });
      if (!res.ok) {
        setLoading(false)
        return ErrorNotify("Something went wrong. Please try again 🫡");
      }else{
        setLoading(false)
        SuccessNotify("URI Send successfully check your email 👍")
      }
    } catch (err) {
      console.log(err);
      setLoading(false)
      return ErrorNotify(
        "An error occurred while senting URI. Please try again 🫡🫠"
      );
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
    <div className="reset-main-container">
      <div className="reset-container">
        <form onSubmit={handleSubmit}>
          <h1>Email or Username</h1>
          <input
            type="text"
            placeholder="Enter email or username"
            onChange={(e) => setUserIdentifier(e.target.value)}
            value={userIdentifier}
          />
          <button>Sent verification</button>
        </form>
      </div>
    </div>
  );
}
