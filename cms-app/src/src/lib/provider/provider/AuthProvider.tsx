import { useEffect, useState, type ReactNode } from "react"
import AuthContext from "../../../context/AuthContext"
import type { ICredentials, ILoginResponse, IUserDetail } from "../../../types/auth-type"
import axiosInstance from "../../../config/apiClient"
import Cookies from "js-cookie"

const AuthProvider = ({children}: Readonly<{children: ReactNode}>) => {
  const [loggedInUser, setLoggedInUser] = useState<null|IUserDetail>(null)
  const [loading, setLoading]=useState<boolean>(true);

  // define the states or actions 
  const login =async (credentials: ICredentials) => {
    try {
      // time -> 60mins
      const response = await axiosInstance.post("/auth/login", credentials) as {data: ILoginResponse}
      Cookies.set("_at_62", response.data.accessToken)
      Cookies.set("_rt_62", response.data.refreshToken)

      const userDetail = await getLoggedInUser()
      return userDetail
    } catch(exception) {
      console.log(exception)
    }
  }

  const getLoggedInUser = async () => {
    try { 
      const response = await axiosInstance.get("/auth/me") as {data: IUserDetail}
      setLoggedInUser(response.data)
      return response.data;
    } catch(exception) {
      console.log(exception)
    } finally {
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
  return loading ? (
    <>Loading...</>
  ) : (
    <AuthContext.Provider
      value={{
        loggedInUser: loggedInUser,
        login: login,
        getLoggedInUser: getLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;