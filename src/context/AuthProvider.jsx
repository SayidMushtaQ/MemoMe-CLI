import { createContext, useEffect, useState } from "react";
const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true)
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    if (authToken) {
      (async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/auth/user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const { data } = await res.json();
          setUser(data.user);
          setLoading(false)
        } catch (err) {
          setLoading(false)
          console.log(err);
        }
      })();
    }else{
      setLoading(false)
    }
  }, [authToken]);
  return (
    <AuthContext.Provider value={{ user, setUser,authToken,loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
