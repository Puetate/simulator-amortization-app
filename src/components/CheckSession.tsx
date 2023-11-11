import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminRoutes, PublicRoutes, UserRoles, UserRoutes } from "../models";
import { useSessionStore } from "../store";

const allowedRoutes = Object.values(PublicRoutes) as string[];

const defaultRoutes: Record<string, string> = {
  ADMIN: AdminRoutes.company,
  USER: UserRoutes.amortization
};

export default function CheckSession() {
  const { token, user } = useSessionStore();
  const location = useLocation();
  return token === "" || user.roles[0].name !== UserRoles.UNDEFINED ? (
    <Outlet />
  ) : allowedRoutes.includes(location.pathname) ? (
    <Navigate to={defaultRoutes[user.roles[0].name]} />
  ) : (
    <Navigate to={PublicRoutes.default} />
  );
}
