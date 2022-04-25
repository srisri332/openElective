import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireStudentAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return localStorage.getItem("token") != null &&
    localStorage.getItem("user") == "Student" ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireStudentAuth;
