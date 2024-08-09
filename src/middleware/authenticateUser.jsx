import { useLocation } from "react";
import { useAuth } from "../hook/useAuth";
import {Navigate} from 'react-router-dom'

const EXCLUDE_PATHS = ["/login", "/register","/verify"];

export default function AuthenticateUser({children}) {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) {
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
  }
  const isExcludePath = EXCLUDE_PATHS.includes(location.pathname);
  if (user && isExcludePath) {
    return <Navigate to={"/"} />;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
