import io from "socket.io-client"

const socket = io("http://localhost:9005/")

export default socket;