import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/admin/orders/get", {
          headers: {
            Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with the actual auth token if needed
          },
        });

        if (response.data.success) {
          setOrders(response.data.data); // Set the orders in state
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Render loading or error state
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.name || "N/A"}</td>
              <td className="border px-4 py-2">{order.email || "N/A"}</td>
              <td className="border px-4 py-2">{order.orderStatus || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
