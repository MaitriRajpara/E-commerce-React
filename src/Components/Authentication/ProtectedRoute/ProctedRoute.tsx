import { Navigate, Outlet } from "react-router-dom";
import { storage } from "../../../Utils/LocalStorage";

export const ProtectedRoute = () => {
  const currentUser = storage.get("currentUser");
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
