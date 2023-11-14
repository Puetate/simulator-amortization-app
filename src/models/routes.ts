export interface PublicRoutes {
  default: string;
  login: string;
  register: string;
}

export interface UserRoutes {
  amortization: string;
}

export interface AdminRoutes {
  company: string;
  companyCreate: string;
}

export const PublicRoutes: PublicRoutes = {
  default: "/",
  login: "/login",
  register: "/register"
};

export const UserRoutes: UserRoutes = {
  amortization: "/user/amortization"
};

export const AdminRoutes: AdminRoutes = {
  company: "/admin/company",
  companyCreate: "/admin/credit"
};

export const AppRoutes = {
  ...UserRoutes,
  ...AdminRoutes
};

export const defaultRoutes: Record<string, string> = {
  ADMIN: AdminRoutes.company,
  USER: UserRoutes.amortization
};
