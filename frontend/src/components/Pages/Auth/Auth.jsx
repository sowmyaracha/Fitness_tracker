import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";

import React from "react";

const Auth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  //   const isRoleAllowed = allowedRoles.find((role) => auth.role?.includes(role));

  //   return isRoleAllowed ? (
  //     auth.token ? (
  //       <Outlet />
  //     ) : (
  //       <Navigate to="/auth/login" state={{ from: location }} replace />
  //     )
  //   ) : auth.token ? (
  //     <Navigate
  //       to={"/dashboard/" + auth.role || ""}
  //       state={{ from: location }}
  //       replace
  //     />
  //   ) : (
  //     <Navigate to="/auth/login" state={{ from: location }} replace />
  //   );
  // };
  if (location.pathname === "/dashboard/") {
    return <Navigate to="/dashboard" replace />;
  }
  const isLoggedIn = !!auth?.token;
  const userRole = auth?.role;

  if (location.pathname === "/dashboard") {
    if (isLoggedIn) {
      return <Navigate to={`/dashboard/${userRole}`} replace />;
    } else {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
  }

  if (allowedRoles.length === 0) {
    if (isLoggedIn) {
      return (
        <Navigate
          to={`/dashboard/${userRole}`}
          state={{ from: location }}
          replace
        />
      );
    }
    return <Outlet />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={`/dashboard/${userRole}`}
      state={{ from: location }}
      replace
    />
  );
};

export default Auth;
