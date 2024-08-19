import { UserAccountType } from "../types/UserAccountTypes"
//import { ServiceType } from "types/ServicesTypes"
import {create} from "zustand"
//import { TypeOfExpensesType } from "types/ExpensesTypes"


type userStore = { 
   user: UserAccountType | null,
   //userServices: ServiceType | null,
   //userClients: ClientTypes[] | null,
   //userTypeOfExpenses: TypeOfExpensesType[] | [],
   setUserAccountData: (data: UserAccountType | null) => void,
   //setUserServices: (data: ServiceType | null) => void,
   //setUserClients: (data: ClientTypes[] | null) => void,
   //setUserTypeOfExpenses: (data: TypeOfExpensesType[] | []) => void,
}


export const userStore = create<userStore>((set) => ({ 
     user: null,
     // userServices: null,
     // userClients: null,
     // userTypeOfExpenses: [],
     setUserAccountData: (data: UserAccountType | null) => set({ user: data }),
     //setUserServices: (data: ServiceType | null) => set({ userServices: data }),
     //setUserClients: (data: ClientTypes[] | null) => set({ userClients: data }),
     //setUserTypeOfExpenses: (data: TypeOfExpensesType[] | []) => set({ userTypeOfExpenses: data }),
}))
