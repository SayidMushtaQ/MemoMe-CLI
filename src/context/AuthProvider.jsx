import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = Cookie.get("authToken");
    console.log(token)
    if (token) {
      (async () => {
        try {
          const res = await fetch("https://memome-srv.onrender.com/api/v1/auth/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include"
          });
          const { data } = await res.json();
          console.log(res)
          setUser(data.user);
        } catch (err) {
          console.log(err);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
