import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // Importing axios for API call
import NoData from '../components/NoData';
import Notification from '../pages/Notification'; // Import Notification component

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);
  const userRole = useSelector(state => state.user.role); // Assuming user role is stored in state.user.role
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [selectedStatus, setSelectedStatus] = useState(''); // New state for selected status
  const [notification, setNotification] = useState(''); // State for notification message

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const openModal = (order) => {
    setSelectedOrder(order); 
    setSelectedStatus(order.order_status); // Set the initial status
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedOrder(null); 
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const saveStatus = async () => {
    console.log('Updating status:', selectedStatus);
    console.log('Selected Order ID:', selectedOrder._id); // Log the order ID
    const url = `http://localhost:8080/api/order/${selectedOrder._id}/update-status`;
    console.log('API URL:', url); // Log the full URL
  
    // Get token from localStorage or cookies
    const token = localStorage.getItem('accessToken'); // Or from cookies if you're using them
  
    try {
      const response = await axios.put(
        url,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
          withCredentials: true, // Send cookies if required (optional)
        }
      );
  
      if (response.status === 200) {
        const updatedOrder = response.data;
        console.log('Order updated successfully:', updatedOrder);
        
        // Update the state with the new order status
        setSelectedOrder(updatedOrder);
        
        // Update the orders list with the updated order
        const updatedOrders = orders.map(order => 
          order._id === updatedOrder._id ? updatedOrder : order
        );
        dispatch({ type: 'UPDATE_ORDERS', payload: updatedOrders });

        // Set success notification
        setNotification('Status updated successfully!');
        
        // Close the modal
        closeModal();
      } else {
        console.error('Error updating status:', response.data.message);
        // Set error notification
        setNotification('Error updating status!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Set error notification
      setNotification('Error updating status!');
    }
  };

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
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
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
                    onClick={() => handleImageClick(order.productId._id)}  
                  />
                </td>
                <td className="border px-4 py-2">{order.totalAmt || 'N/A'}</td>
                <td className="border px-4 py-2">{order.order_status}</td> {/* Updated status */}
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

{notification && (
        <Notification message={notification} onClose={() => setNotification('')} />
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
              {/* Order Details */}
              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Order ID</div>
                <div className="col-span-2">{selectedOrder._id}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Product Name</div>
                <div className="col-span-2">{selectedOrder.product_details?.name}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Product ID</div>
                <div className="col-span-2">{selectedOrder.productId?._id}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">User ID</div>
                <div className="col-span-2">{selectedOrder.userId?._id}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">User Name</div>
                <div className="col-span-2">{selectedOrder.userId?.name}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Amount</div>
                <div className="col-span-2">{selectedOrder.totalAmt}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Payment Mode</div>
                <div className="col-span-2">{selectedOrder.payment_mode}</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-gray-700">
                <div className="font-semibold">Delivery Address</div>
                <div className="col-span-2">
                  {selectedOrder.delivery_address?.address_line}<br />
                  {selectedOrder.delivery_address?.city}, {selectedOrder.delivery_address?.state}<br />
                  {selectedOrder.delivery_address?.pincode}<br />
                  {selectedOrder.delivery_address?.country}<br />
                  {selectedOrder.delivery_address?.mobile}
                </div>
              </div>

              {userRole === 'ADMIN' && (
                <div className="grid grid-cols-3 gap-4 text-gray-700">
                  <div className="font-semibold">Status</div>
                  <div className="col-span-2">
                    <select value={selectedStatus} onChange={handleStatusChange} className="border p-2 rounded">
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Successfully">Successfully</option>
                    </select>
                  </div>
                </div>
              )}

              {userRole === 'ADMIN' && (
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={saveStatus}
                  >
                    Save Status
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
