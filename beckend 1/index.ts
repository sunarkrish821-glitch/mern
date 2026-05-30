import http from "http";
import app from "./src/app";


const server = http.createServer(app);


// TODO: To put these configs in .env
// listen 
const HOST = "127.0.0.1"
// 0 - (2^16 - 1)
const PORT = 9005


server.listen(PORT, HOST, () => {
  // if(err) {
  //   console.error(err);
  //     console.log("Server error ", err.message)
  //     process.exit(1)
  // } else {

    console.log("Server is running on port "+PORT)
    console.log("To disconnect server, press CTRL+C")
  // }
})

server.on("error", (err) => {
  console.error(err)
  console.log("Server error ", err.message)
  process.exit(1)
})