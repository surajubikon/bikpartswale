import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import NoData from '../components/NoData';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedOrder, setSelectedOrder] = useState(null); 

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const openModal = (order) => {
    setSelectedOrder(order); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedOrder(null); 
  };

  // Log orders to check the structure
  console.log('Orders:', orders);

  return (
    <div>
      <div className="bg-white shadow-md p-4 font-semibold mb-6">
        <h1>My Orders</h1>
      </div>

      {!orders[0] && <NoData />}

      {orders.length > 0 && (
        <table className="min-w-full table-auto mt-5 border-collapse">
          <thead>
            <tr className="bg-orange-200 text-left">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Image</th>
              {/* Removed Quantity column */}
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id + index + "order"} className="border-b">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.product_details.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={order.product_details.image[0]}
                    alt={order.product_details.name}
                    className="w-14 h-14 object-cover cursor-pointer"
                    onClick={() => handleImageClick(order.productId)}  
                  />
                </td>
                {/* Removed Quantity logic */}
                <td className="border px-4 py-2">{order.totalAmt || 'N/A'}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-700 text-white px-4 py-2 rounded"
                    onClick={() => openModal(order)} 
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96 max-w-lg relative overflow-auto">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-red-600 hover:text-black"
              onClick={closeModal} 
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Order ID</div>
                <div className="col-span-2">{selectedOrder.orderId}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Product Name</div>
                <div className="col-span-2">{selectedOrder.product_details.name}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Product ID</div>
                <div className="col-span-2">{selectedOrder.productId}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">User ID</div>
                <div className="col-span-2">{selectedOrder.userId}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Amount</div>
                <div className="col-span-2">{selectedOrder.totalAmt || 'N/A'}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Payment Mode</div>
                <div className="col-span-2">{selectedOrder.payment_status}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Delivery Address</div>
                <div className="col-span-2">
                  {selectedOrder.delivery_address.address_line}<br />
                  {selectedOrder.delivery_address.city}, {selectedOrder.delivery_address.state}<br />
                  {selectedOrder.delivery_address.pincode}<br />
                  {selectedOrder.delivery_address.country}<br />
                  {selectedOrder.delivery_address.mobile}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
