import { NavLink } from 'react-router';

const mockOrders = [
    { id: 1, customer: 'John Doe', date: '2023-10-01', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', date: '2023-10-02', status: 'Shipped' },
    { id: 3, customer: 'Bob Johnson', date: '2023-10-03', status: 'Delivered' },
    { id: 4, customer: 'Alice Brown', date: '2023-10-04', status: 'Pending' },
    { id: 5, customer: 'Charlie Wilson', date: '2023-10-05', status: 'Cancelled' },
    { id: 6, customer: 'Diana Prince', date: '2023-10-06', status: 'Shipped' },
    { id: 7, customer: 'Eve Adams', date: '2023-10-07', status: 'Delivered' },
    { id: 8, customer: 'Frank Miller', date: '2023-10-08', status: 'Pending' },
    { id: 9, customer: 'Grace Lee', date: '2023-10-09', status: 'Shipped' },
    { id: 10, customer: 'Henry Ford', date: '2023-10-10', status: 'Delivered' },
    { id: 11, customer: 'Ivy Chen', date: '2023-10-11', status: 'Pending' },
    { id: 12, customer: 'Jack Ryan', date: '2023-10-12', status: 'Cancelled' },
]

const itemsPerPage = 5
const currentPage = 1
const search = ''

const filteredOrders = mockOrders.filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.status.toLowerCase().includes(search.toLowerCase())
)

const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage
const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

export default function ListOrder() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
                    <NavLink to="/admin/orders/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                       + Create Order
                    </NavLink>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by customer or status..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                <th className="border px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((order, index) => (
                                <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border px-4 py-3 text-sm text-gray-800">{order.id}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-800">{order.customer}</td>
                                    <td className="border px-4 py-3 text-sm text-gray-800">{order.date}</td>
                                    <td className="border px-4 py-3 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        disabled={currentPage === 1}
                        className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg">
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}