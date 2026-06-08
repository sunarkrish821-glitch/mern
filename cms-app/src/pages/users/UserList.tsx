import { useEffect } from "react"
import socket from "../../config/socketConfig"
import { AllUsers } from "./AllUsers"

export default function UserList() {
 

  useEffect(() => {
      socket.connect();
  }, [])
  return (<>
    <AllUsers />
  </>)
}