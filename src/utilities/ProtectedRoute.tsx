import { useContext } from "react";
import { UserContext } from "./useContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return <Outlet />;
};
