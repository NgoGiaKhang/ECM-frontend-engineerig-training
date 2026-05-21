import { Navigate, Outlet } from "react-router-dom";
import { routes } from "../../constants/routes";
import { useAuthStore } from "./auth.store";

export default function ProtectedRoute() {

  const isAuth = useAuthStore((s) => s.isAuthenticated)
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={routes.login} replace />
  );
}