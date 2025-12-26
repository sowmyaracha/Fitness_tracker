import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
     role: localStorage.getItem("role"),
     user: localStorage.getItem("user"),
     token: localStorage.getItem("token"),
  
  });

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedRole && storedToken && storedUser) {
      setAuth({ role: storedRole, token: storedToken, user: storedUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
