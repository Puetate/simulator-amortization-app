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
  userId: "",
  personId: "",
  names: "",
  email: "",
  company: {
    _id: "",
    name: "",
    address: "",
    phone: "",
    logo: "",
    ruc: ""
  },
  roles: [{ _id: "", name: UserRoles.UNDEFINED }]
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
      }
    }),
    {
      name: "auth"
    }
  )
);
