import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminRoutes, UserRoles } from "../models";
import { useSessionStore } from "../store";

const allowedRoutes: Record<string, string[]> = {
  ADMIN: Object.values(AdminRoutes) as string[],
  USER: Object.values(UserRoles) as string[],
  UNDEFINED: [],
};

export default function RequireAuth() {
  const { token, user } = useSessionStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
  }, [token, navigate]);

  return user.roles![0].name !== UserRoles.UNDEFINED &&
    user.roles!.some((role) =>
      allowedRoutes[role.name as string].includes(location.pathname)
    ) ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
}
