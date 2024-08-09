import { useAuth } from "../hook/useAuth";
import { Navigate, Outlet } from "react-router-dom";
export default function AuthenticateUser() {
  const { user, loading } = useAuth();
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
  if(user && !user.isVerified){
    localStorage.setItem('user_email',user.email)
    return <Navigate to={'/sent-verify'}/>
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}
