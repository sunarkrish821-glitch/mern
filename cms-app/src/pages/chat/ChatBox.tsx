import { useCallback, useEffect, useState, type BaseSyntheticEvent } from "react";
import { useParams } from "react-router"
import { toast } from "sonner";
import axiosInstance from "../../config/apiClient";
import type { IUserDetail } from "../../types/auth-type";
import { useAuth } from "../../lib/provider/hook/auth-hook";
import socket from "../../config/socketConfig";

export default function ChatBox() {
  const [messages, setMessages] = useState();
  const [message, setMessage] =  useState<string>("");
  const [activeUser, setActiveUser] = useState<IUserDetail>();
  const {loggedInUser} = useAuth();

  const params = useParams();

  const getActiveUsers = useCallback(async() => {
    try {
      const userDetail = await axiosInstance.get("/user/"+params.userId)
      setActiveUser(userDetail.data);
    } catch(exception) {
      console.log(exception)
    }
  }, [params.userId])

  const getAllMessages = async () => {
    try  {
      const response = await axiosInstance.get("/chat/"+params.userId, {params: {limit:30}})
      setMessages(response.data)
    } catch(exception) {
      toast.error("Error fetching messages")
      console.log(exception)
    }
  }

  useEffect(() => {
    const newMessageHandle = (data) => {
      getAllMessages()
    }

    socket.on("messageReceived", newMessageHandle);

    return () => {
      getActiveUsers()
      getAllMessages();
      socket.off("messageReceived", newMessageHandle);
    }
  }, [])


  const submitChat= async(e:BaseSyntheticEvent) => {
    e.preventDefault();
    try {
      const messageDetail = {
        message: message, 
        sender: loggedInUser?._id,
        receiver: activeUser?._id
      }

      const response = await axiosInstance.post("/chat", messageDetail)
      socket.emit("newMessageSend", response.data);
      setMessage("")
    } catch(exception) {
      toast.error("Error sending message")
      console.log(exception)
    }
  }

  return (
    <>
      <div className="flex flex-col max-w-2xl w-full h-[70vh] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full">
              <img
                src={
                  import.meta.env.VITE_APP_ASSETS_URL +
                  "/uploads/users/" +
                  activeUser?.image.filename
                }
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-lg">
                {activeUser?.firstName + " " + activeUser?.lastName}
              </div>
              <div className="text-xs text-gray-500">
                @{activeUser?.username}
              </div>
            </div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 flex flex-col space-y-2 px-6 py-4 overflow-y-auto bg-gray-50">
          {messages &&
            messages.map((row, index) =>
              row.sender !== activeUser?._id ? (
                <div className="flex justify-end" key={index}>
                  <div className="max-w-xs bg-blue-600 text-white p-3 rounded-lg rounded-br-none shadow">
                    {row.message}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start" key={index}>
                  <div className="max-w-xs bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none shadow">
                  {row.message}
                  </div>
                </div>
              ),
            )}
        </div>
        {/* Input */}
        <div className="px-6 py-4 border-t bg-white">
          <form className="flex items-center space-x-3" onSubmit={submitChat}>
            <input
              type="text"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 transition"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 font-medium transition focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}