export interface PublicRoutes {
  default: string;
  login: string;
  register: string;
}

export interface UserRoutes {}

export interface AdminRoutes {}

export const PublicRoutes: PublicRoutes = {
  default: "/",
  login: "/login",
  register: "/register",
};

export const UserRoutes: UserRoutes = {
  amortization: "/amortization",
};

export const AdminRoutes: AdminRoutes = {
  company: "/admin/company",
  companyCreate: "/admin/credit",
};

export const AppRoutes = {
  ...UserRoutes,
  ...AdminRoutes,
};
