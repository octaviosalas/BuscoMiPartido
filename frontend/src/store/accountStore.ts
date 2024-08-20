import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserAccountType } from "../types/UserAccountTypes";

type userStore = { 
  user: UserAccountType | null;
  setUserAccountData: (data: UserAccountType | null) => void;
};

export const userStore = create<userStore>()(
  persist(
    (set) => ({
      user: null,
      setUserAccountData: (data: UserAccountType | null) => set({ user: data }),
    }),
    {
      name: "user-store", // nombre de la key en el localStorage o sessionStorage
      // Puedes especificar storage: sessionStorage si quieres que se guarde en la sesión en lugar del almacenamiento local
    }
  )
);