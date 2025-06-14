import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/ui/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/signin" />;
};

export default PrivateRoute;
