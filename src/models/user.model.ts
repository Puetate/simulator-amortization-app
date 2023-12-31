import { Company } from ".";

export interface Roles {
  _id: string;
  name: UserRoles;
}

export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMINISTRADOR",
  UNDEFINED = "UNDEFINED"
}

export interface User {
  userId: string;
  personId: string;
  names: string;
  email: string;
  company: Company;
  password?: string;
  roles: Roles[];
}
