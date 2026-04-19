import { useEffect, useState, type ReactNode } from "react"
import AuthContext from "../../../context/AuthContext"
import type { ICredentials, ILoginResponse, IUserDetail } from "../../../types/auth-type"
import axiosInstance from "../../../config/apiClient"
import Cookies from "js-cookie"

const AuthProvider = ({children}:Readonly<{ children:ReactNode }>) => {
   const [loggedInUser, setLoggedInUser] = useState<null|IUserDetail>(null)
      const [Loading, setLoading] = useState<boolean>(true);

      const login = async (credentials: ICredentials) => {
         try {
            const response = await axiosInstance.post("/auth/login", credentials) as ILoginResponse
            Cookies.set("_at_62", response.accessToken)
            Cookies.set("_rt_62", response.refreshToken)

            const userDetail = await getLoggedInUser()
            return userDetail
         } catch (exception) {
            console.log(exception)
         }
     }

      const getLoggedInUser = async () => {
         try{
          const response = await axiosInstance.get("/auth/me") as IUserDetail;
          setLoggedInUser(response)
          return response;
         } catch (exception) {
            console.log(exception)
         }  finally {
        setLoading(false)  
    }
      }

      useEffect(() => {
         const token = Cookies.get("_at_62")
         if(token) {
            getLoggedInUser()
         } else {
            setLoading(false)
         }
      },[])

      return (

         Loading ?(
             <>Loading....</>
         ) : (
             <AuthContext.Provider value={{
        loggedInUser: loggedInUser,
        login: login,
        getLoggedInUser: getLoggedInUser
     }}>
        {children}
        </AuthContext.Provider>
         )
         )
}


export default AuthProvider