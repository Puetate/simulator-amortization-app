export enum UserRoles {
    CLIENT = "CLIENTE",
    ADMIN = "ADMINISTRADOR",
}


export interface User {
    id: string;
    dni: string;
    email: string;
    lastName: string;
    firstName: string;
    phone: string;
    address: string;
    password: string;
    role: UserRoles;
}
