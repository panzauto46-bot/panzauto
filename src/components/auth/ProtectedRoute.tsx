import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth";

export function ProtectedRoute() {
  const { isOwner } = useAuth();
  const location = useLocation();

  if (!isOwner) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
