import { useAuth } from "../hook/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticateUser() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
}
