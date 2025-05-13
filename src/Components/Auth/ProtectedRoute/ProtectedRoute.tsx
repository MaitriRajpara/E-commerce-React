import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
