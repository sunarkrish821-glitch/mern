import { createContext } from "react";
import type { ICredentials, IUserDetail } from "../types/auth-type";

// type definition for context
export interface IAuthContext {
    loggedInUser: null | IUserDetail,
    login: (credentials: ICredentials) => Promise<void|IUserDetail>,
    getLoggedInUser: () => Promise<void|IUserDetail> 
}



// default values for context
const AuthContext = createContext<IAuthContext>({
    loggedInUser: null,
    async login() {},
    async getLoggedInUser() {}
})

export default AuthContext






