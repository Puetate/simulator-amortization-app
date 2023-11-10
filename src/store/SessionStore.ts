import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRoles } from "../models/user.model";
interface SessionState {
    user: User;
    setUser: (user: User) => void;
    token: string;
    setToken: (token: string) => void;
    logout: () => void;
}

const initialUser: User = {
    id: "",
    dni: "",
    email: "",
    lastName: "",
    firstName: "",
    phone: "",
    address: "",
    password: "",
    role: UserRoles.CLIENT
    };

export const useSessionStore = create(
    persist<SessionState>(
        (set) => ({
        user: initialUser,
        setUser: (user: User) => set(() => ({ user: user })),
        token: "",
        setToken: (token: string) => set(() => ({ token: token })),
        logout: () => {
            set(() => ({ token: "", user: initialUser }));
            useSessionStore.persist.clearStorage();
        },
        }),
        {
        name: "auth",
        }
    )
);