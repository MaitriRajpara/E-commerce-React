import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem("currentUser");
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
