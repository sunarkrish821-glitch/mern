import { Navigate } from "react-router";
import { useAuth } from "../../../lib/provider/hook/auth-hook";
import type {ReactNode } from "react";

export const CheckPermission = ({allowed, children}: Readonly<{allowed: string, children: ReactNode}>) => {
    const {loggedInUser} = useAuth()

    if(loggedInUser && loggedInUser.role === allowed) {
        return children
    } else {
        return <></>
    }
}

export default function CheckLogin({children, allowed}:Readonly<{children: ReactNode, allowed: string}>) {
    const {loggedInUser} = useAuth();
    if (!loggedInUser) {
        // if user is not loggedin then redirect to login screen
        return <Navigate to="/" />
    } else if(loggedInUser && loggedInUser.role !== allowed){
         // if user is logged in and user is not allowed to access children component    
          return <Navigate to={'/${loggedInUser.role}'}/>
    } else {
       return children
    }
}
