import { useAuth } from "../hook/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userExcludePaths } from "../constants";
export default function CheckUser() {
  const { user,loading } = useAuth();
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
  return user &&
    userExcludePaths.includes(location.pathname) &&
    user.isVerified ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
}
