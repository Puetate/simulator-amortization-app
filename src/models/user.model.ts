export interface Roles {
  _id: string;
  name: UserRoles;
}

export enum UserRoles {
  CLIENT = "CLIENTE",
  ADMIN = "ADMINISTRADOR",
  UNDEFINED = "UNDEFINED",
}

export interface User {
  userId: string;
  personId: string;
  names: string;
  email: string;
  roles: Roles[];
}
