import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function RecentOrders() {
  const { t } = useTranslation("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([
    {
      id: "DE124321",
      customer: "John Doe",
      email: "johndeo@gmail.com",
      initials: "JD",
      product: "Software License",
      value: 1850.34,
      date: "2024-06-15",
      status: "Complete",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
    },
    {
      id: "DE124322",
      customer: "Kierra Franci",
      email: "kierra@gmail.com",
      initials: "KF",
      product: "Software License",
      value: 1850.34,
      date: "2024-06-15",
      status: "Complete",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
    },
    {
      id: "DE124323",
      customer: "Emerson Workman",
      email: "emerson@gmail.com",
      initials: "EW",
      product: "Software License",
      value: 1850.34,
      date: "2024-06-15",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100",
    },
    {
      id: "DE124324",
      customer: "Chance Philips",
      email: "chance@gmail.com",
      initials: "CP",
      product: "Software License",
      value: 1850.34,
      date: "2024-06-15",
      status: "Complete",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
    },
    {
      id: "DE124325",
      customer: "Terry Geidt",
      email: "terry@gmail.com",
      initials: "TG",
      product: "Software License",
      value: 1850.34,
      date: "2024-06-15",
      status: "Complete",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100",
    },
  ]);
  const filterOrders = orders.filter((o)=>
  o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const handleDelete = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6 w-full transition-colors ">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 w-full gap-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("recentOrders")}
        </h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="border rounded px-3 py-1 text-gray-800 dark:text-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          <button 
          className="border px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors">
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Deal ID
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Customer
              </th>
              <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Product/Service
              </th>
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Deal Value
              </th>
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Close Date
              </th>
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Status
              </th>
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
             {filterOrders.length==0&&<h1>No Orders Found</h1> }
            {filterOrders.map((order, index) => (
              <tr key={index}>
                <td className="pl-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                  {order.id}
                </td>
                <td className="px-4 py-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-700 flex items-center justify-center text-white font-semibold text-sm">
                    {order.initials}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-100 font-medium">{order.customer}</p>
                    <p className="text-gray-400 dark:text-gray-300 text-xs">{order.email}</p>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{order.product}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">${order.value.toLocaleString()}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{order.date}</td>
                <td className="px-4 py-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  <button
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
