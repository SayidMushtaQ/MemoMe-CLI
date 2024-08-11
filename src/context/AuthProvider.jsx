import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken,setAuthToken] = useState(null);
  useEffect(() => {
    const token = Cookie.get("authToken");
    console.log(token)
    if (token) {
      (async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URI}/auth/user`, {
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
          setAuthToken(token)
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
    <AuthContext.Provider value={{ user, setUser, loading,authToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
