import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    role: localStorage.getItem("role"),
    user: localStorage.getItem("user"),
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Check if token is expired
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          // Token expired, clear localStorage
          localStorage.clear();
          setAuth({ role: null, user: null, token: null });
        }
      } catch (e) {
        localStorage.clear();
        setAuth({ role: null, user: null, token: null });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };