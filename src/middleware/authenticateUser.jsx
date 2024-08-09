import { useAuth } from "../hook/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticateUser() {
  const { loading, user } = useAuth();
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
  return user ? <Outlet /> : <Navigate to="/login" />;
}
