import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoData from '../components/NoData';
import Notification from '../pages/Notification';
import { FaBell } from 'react-icons/fa';
import jsPDF from 'jspdf';

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order);
  const userRole = useSelector(state => state.user.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  useEffect(() => {
    if (orders.some(order => order.isNew)) {
      setNewOrderAlert(true);
    }
  }, [orders]);

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.order_status);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const saveStatus = async () => {
    const url = `http://localhost:5000/api/order/${selectedOrder._id}/update-status`;
    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios.put(
        url,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const updatedOrder = response.data;
        setSelectedOrder(updatedOrder);

        const updatedOrders = orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        dispatch({ type: 'UPDATE_ORDERS', payload: updatedOrders });

        setNotification('Status updated successfully!');
        closeDetailsModal();
      } else {
        setNotification('Error updating status!');
      }
    } catch (error) {
      setNotification('Error updating status!');
    }
  };

  const handleFilterClick = (status) => {
    if (status) {
      const filtered = orders.filter(order => order.order_status === status);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
    closeFilterModal();
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = orders.filter(order =>
      order.userId?.name.toLowerCase().includes(query) ||
      order.product_details?.name.toLowerCase().includes(query) ||
      order.order_status.toLowerCase().includes(query) ||
      (order.delivery_address?.mobile && order.delivery_address.mobile.toString().includes(query))
    );

    setFilteredOrders(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const generateInvoice = (order) => {
    const doc = new jsPDF();

    // Add Logo Image (Replace with your logo's Base64 or URL)
    const logoUrl = "/assets/logobiike-DBicPEJX.png"; // Change this to your logo's URL or Base64

    doc.addImage(logoUrl, "PNG", 150, 10, 45, 20); // Adjust position (x, y) and size (width, height)

    // Set font size and add title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('Invoice', 10, 20);

    // Add current date & time
    const currentDate = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    doc.setFontSize(10);
    doc.text(`Date: ${currentDate}`, 10, 27);

    // Set font size for details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Ensure totalAmt is a number and format it
    const totalAmt = typeof order.totalAmt === 'number' ? order.totalAmt : parseFloat(order.totalAmt);
    const formattedAmount = isNaN(totalAmt) ? 'N/A' : `Rs ${totalAmt.toLocaleString('en-IN',)}`;

    // Add order details
    doc.text(`Order ID: ${order._id || 'N/A'}`, 10, 35);

    doc.setFont("helvetica", "bold");
    doc.text(`Customer Name: ${order.userId?.name || 'N/A'}`, 10, 45);

    doc.setFont("helvetica", "normal");
    doc.text(`Product Name: ${order.product_details?.name || 'N/A'}`, 10, 55);
    doc.text(`Amount: ${formattedAmount}`, 10, 65);
    doc.text(`Status: ${order.order_status || 'N/A'}`, 10, 75);
    doc.text(`Payment Mode: ${order.payment_mode || 'N/A'}`, 10, 85);

    // Delivery Address
    doc.text(`Delivery Address: ${order.delivery_address?.address_line || 'N/A'}`, 10, 95);
    doc.text(`${order.delivery_address?.city || 'N/A'}, ${order.delivery_address?.state || 'N/A'}`, 10, 105);
    doc.text(`${order.delivery_address?.pincode || 'N/A'}, ${order.delivery_address?.country || 'N/A'}`, 10, 115);
    doc.text(`Mobile: ${order.delivery_address?.mobile || 'N/A'}`, 10, 125);

    // Save the PDF
    doc.save(`invoice_${order._id}.pdf`);
  };



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const totalNewOrders = orders.filter(order => order.order_status === 'Pending').length;
  const totalDispatchOrders = orders.filter(order => order.order_status === 'Dispatch').length;
  const totalDeliveredOrders = orders.filter(order => order.order_status === 'Delivered').length;
  const totalCancelledOrders = orders.filter(order => order.order_status === 'Cancelled').length;

  return (
    <div>
      <div className="bg-red-100 shadow-md p-4 font-semibold mb-6 flex justify-between items-center">
        <h1>My Orders</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search orders..."
            className="border px-4 py-2 rounded"
          />
          <button
            className="bg-red-300 text-red-700 px-4 py-2 rounded"
            onClick={openFilterModal}
          >
            Filter
          </button>
          <div className="relative">
            <FaBell className="text-red-500 text-2xl cursor-pointer" />
            {newOrderAlert && <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="text-lg font-semibold text-gray-700">Total Orders: {orders.length}</div>
      </div>

      {!currentOrders.length && <NoData />}

      {currentOrders.length > 0 && (
        <table className="min-w-full table-auto mt-5 border-collapse">
          <thead>
            <tr className="bg-orange-200 text-left">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={order._id + index + "order"} className="border-b">
                <td className="border px-4 py-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td className="border px-4 py-2">{order.userId?.name || 'N/A'}</td>
                <td className="border px-4 py-2">
                  {order.delivery_address?.mobile || 'N/A'}
                </td>
                <td className="border px-4 py-2">{order.product_details.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={order.product_details.image[0]}
                    alt={order.product_details.name}
                    className="w-14 h-14 object-cover cursor-pointer"
                    onClick={() => handleImageClick(order.productId._id)}
                  />
                </td>
                <td className="border px-4 py-2">₹{order.totalAmt || 'N/A'}</td>
                <td className={`border px-4 py-2 ${order.order_status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : order.order_status === 'Delivered' ? "bg-green-100 text-green-700" : order.order_status === 'Cancelled' ? "bg-red-100 text-red-700" : order.order_status === 'Dispatch' ? "bg-blue-100 text-blue-700" : ''}`}>
                  {order.order_status}
                </td>
                <td className="border px-4 py-2 flex justify-center items-center space-x-4">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ease-in-out"
                    onClick={() => openDetailsModal(order)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out"
                    onClick={() => generateInvoice(order)}
                  >
                    Invoice
                  </button>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      )}

      {filteredOrders.length > itemsPerPage && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {notification && (
        <Notification message={notification} onClose={() => setNotification('')} />
      )}

      {isDetailsModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg w-full sm:w-96 max-w-3xl relative overflow-y-auto max-h-[90vh] shadow-lg">
            <button
              className="absolute top-4 right-4 text-4xl font-bold text-red-600 hover:text-red-800"
              onClick={closeDetailsModal}
            >
              &times;
            </button>
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">Order Details</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">Order ID</div>
                <div className="col-span-2 text-gray-900">{selectedOrder._id}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">Product Name</div>
                <div className="col-span-2 text-gray-900">{selectedOrder.product_details?.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">Product ID</div>
                <div className="col-span-2 text-gray-900">{selectedOrder.productId?._id}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">User ID</div>
                <div className="col-span-2 text-gray-900">{selectedOrder.userId?._id}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">User Name</div>
                <div className="col-span-2 text-gray-900">{selectedOrder.userId?.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">Amount</div>
                <div className="col-span-2 text-gray-900">₹{selectedOrder.totalAmt}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">Payment Mode</div>
                <div className="col-span-2 text-gray-900">{selectedOrder.payment_mode}</div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-gray-700">
                <div className="font-semibold text-blue-600">Delivery Address</div>
                <div className="col-span-2 text-gray-900">
                  {selectedOrder.delivery_address?.address_line}<br />
                  {selectedOrder.delivery_address?.city}, {selectedOrder.delivery_address?.state}<br />
                  {selectedOrder.delivery_address?.pincode}<br />
                  {selectedOrder.delivery_address?.country}<br />
                  {selectedOrder.delivery_address?.mobile}
                </div>
              </div>

              {userRole === 'ADMIN' && (
                <div className="mt-8">
                  <label htmlFor="status" className="block font-medium text-blue-600">Update Status</label>
                  <select
                    id="status"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="border-2 border-blue-600 bg-white px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Dispatch">Dispatch</option>
                  </select>
                </div>
              )}

              {userRole === 'ADMIN' && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={saveStatus}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isFilterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Filter Orders</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleFilterClick('Pending')}
                className="block w-full text-center px-4 py-2 bg-orange-100 text-yellow-700 rounded"
              >
                New Orders ({totalNewOrders})
              </button>
              <button
                onClick={() => handleFilterClick('Delivered')}
                className="block w-full text-center px-4 py-2 bg-green-100 text-green-700 rounded"
              >
                Delivered ({totalDeliveredOrders})
              </button>
              <button
                onClick={() => handleFilterClick('Cancelled')}
                className="block w-full text-center px-4 py-2 bg-red-100 text-red-700 rounded"
              >
                Cancelled ({totalCancelledOrders})
              </button>
              <button
                onClick={() => handleFilterClick('Dispatch')}
                className="block w-full text-center px-4 py-2 bg-blue-100 text-blue-700 rounded"
              >
                Dispatch ({totalDispatchOrders})
              </button>
              <button
                onClick={() => handleFilterClick('')}
                className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded"
              >
                Show All ({orders.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;