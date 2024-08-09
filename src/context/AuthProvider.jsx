import { createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = Cookie.get("authToken");
    if (token) {
      (async () => {
        try {
          const res = await fetch("/api/auth/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const { data } = await res.json();
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
