import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";
import axiosInstance from "../../config/apiClient";
import {type IUserDetail } from "../../types/auth-type";
import { NavLink } from "react-router";
import { useAuth } from "../../lib/provider/hook/auth-hook";

export const AllUsers = () => {
  const [data, setData] = useState<Array<IUserDetail>>();
  const {loggedInUser} = useAuth()

  const getAllUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/user");
      setData(response.data);
    } catch (exception) {
      console.log(exception);
      toast.error("Error loading users..");
    }
  }, []);

  // const cal = useMemo(() => {
  //   return "";
  // }, []);

  useEffect(() => {
    return () => {
      getAllUsers()
    }
  }, [])
  return (<>
  <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Users</h2>
    <div className="overflow-x-scroll">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example Row - Replace with map over users */}
          {
            data && data.map((user:IUserDetail) => {
              return (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    @{user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded ${user.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <NavLink to={`/${loggedInUser?.role}/chat/${user._id}`} className="cursor-pointer inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-500 focus:outline-none transition">
                      Chat
                    </NavLink>
                  </td>
                </tr>
              );
            })
          }
          {/* End Example Row */}
        </tbody>
      </table>
    </div>
  </div>
  </>)
}