import { useAuth } from "../hook/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userExcludePaths } from "../constants";
export default function AuthenticateUser() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    console.log('loading')
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
  if (user && !user.isVerified) {
    localStorage.setItem("user_email", user.email);
    return <Navigate to={"/sent-verify"} />;
  }
  if (user && userExcludePaths.includes(location.pathname) && user.isVerified) {
    return <Navigate to={"/"} />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
