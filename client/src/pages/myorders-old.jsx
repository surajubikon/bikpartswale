// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios'; // Importing axios for API call
// import NoData from '../components/NoData';
// import Notification from '../pages/Notification'; // Import Notification component

// const MyOrders = () => {
//   const orders = useSelector(state => state.orders.order);
//   const userRole = useSelector(state => state.user.role); // Assuming user role is stored in state.user.role
//   const navigate = useNavigate(); 
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false); 
//   const [selectedOrder, setSelectedOrder] = useState(null); 
//   const [selectedStatus, setSelectedStatus] = useState(''); // New state for selected status
//   const [notification, setNotification] = useState(''); // State for notification message

//   const handleImageClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };
//   const openModal = (order) => {
//     setSelectedOrder(order); 
//     setSelectedStatus(order.order_status); // Set the initial status
//     setIsModalOpen(true); 
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); 
//     setSelectedOrder(null); 
//   };

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//   };

//   const saveStatus = async () => {
//     // const url = `http://localhost:5000/api/order/${selectedOrder._id}/update-status`;
//     const url = `http://localhost:5000/api/order/${selectedOrder._id}/update-status`;
  
//     // Get token from localStorage or cookies
//     const token = localStorage.getItem('accessToken'); // Or from cookies if you're using them
  
//     try {
//       const response = await axios.put(
//         url,
//         { status: selectedStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token in the Authorization header
//           },
//           withCredentials: true, // Send cookies if required (optional)
//         }
//       );
  
//       if (response.status === 200) {
//         const updatedOrder = response.data;
        
//         // Update the state with the new order status
//         setSelectedOrder(updatedOrder);
        
//         // Update the orders list with the updated order
//         const updatedOrders = orders.map(order => 
//           order._id === updatedOrder._id ? updatedOrder : order
//         );
//         dispatch({ type: 'UPDATE_ORDERS', payload: updatedOrders });

//         // Set success notification
//         setNotification('Status updated successfully!');
        
//         // Close the modal
//         closeModal();
//       } else {
//         console.error('Error updating status:', response.data.message);
//         // Set error notification
//         setNotification('Error updating status!');
//       }
//     } catch (error) {
//       console.error('Error updating status:', error);
//       // Set error notification
//       setNotification('Error updating status!');
//     }
//   };

//   return (
//     <div>

 

//       {/* <div className="bg-white shadow-md p-4 font-semibold mb-6">
//         <h1>My Orders</h1>
//       </div> */}

// <div className="bg-red-100 shadow-md p-4 font-semibold mb-6 flex justify-between items-center">
//   <h1>My Orders</h1>
//   <button className="bg-red-300 text-red-700 px-4 py-2 rounded">Filtters</button>
// </div>


//       {!orders[0] && <NoData />}

//       {orders.length > 0 && (
//         <table className="min-w-full table-auto mt-5 border-collapse">
//           <thead>
//             <tr className="bg-orange-200 text-left">
//               <th className="border px-4 py-2">Customer Name</th>
//               <th className="border px-4 py-2">Product Name</th>
//               <th className="border px-4 py-2">Image</th>
//               <th className="border px-4 py-2">Amount</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//           {orders.map((order, index) => (
//   <tr key={order._id + index + "order"} className="border-b">
   
//     <td className="border px-4 py-2">{order.userId?.name || 'N/A'}</td>
//     <td className="border px-4 py-2">{order.product_details.name}</td>
//     <td className="border px-4 py-2">
//       <img
//         src={order.product_details.image[0]}
//         alt={order.product_details.name}
//         className="w-14 h-14 object-cover cursor-pointer"
//         onClick={() => handleImageClick(order.productId._id)}  
//       />
//     </td>
//     <td className="border px-4 py-2">₹{order.totalAmt || 'N/A'}</td>
//     <td
//   className={`border px-4 py-2 ${
//     order.order_status === 'Panding'
//       ? 'bg-yellow-100 text-yellow-700'
//       : order.order_status === 'Delivered'
//       ? "bg-green-100 text-green-700"
//       : order.order_status === 'Cancelled'
//       ? "bg-red-100 text-red-700"
//       : order.order_status === 'Dispatch'
//       ? "bg-blue-100 text-blue-700"
//       : ''
//   }`}


// >
//   {order.order_status}
// </td>
//     <td className="border px-4 py-2">
//       <button
//         className="bg-red-700 text-white px-4 py-2 rounded"
//         onClick={() => openModal(order)} 
//       >
//         View Details
//       </button>
//     </td>
//   </tr>
// ))}

//           </tbody>
//         </table>
//       )}

// {notification && (
//         <Notification message={notification} onClose={() => setNotification('')} />
//       )}

     

//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-full sm:w-96 max-w-lg relative overflow-auto">
//             <button
//               className="absolute top-2 right-2 text-2xl font-bold text-red-600 hover:text-black"
//               onClick={closeModal} 
//             >
//               &times;
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Order Details</h2>

//             <div className="space-y-4">
//               {/* Order Details */}
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Order ID</div>
//                 <div className="col-span-2">{selectedOrder._id}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Product Name</div>
//                 <div className="col-span-2">{selectedOrder.product_details?.name}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Product ID</div>
//                 <div className="col-span-2">{selectedOrder.productId?._id}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">User ID</div>
//                 <div className="col-span-2">{selectedOrder.userId?._id}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">User Name</div>
//                 <div className="col-span-2">{selectedOrder.userId?.name}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Amount</div>
//                 <div className="col-span-2">₹{selectedOrder.totalAmt}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Payment Mode</div>
//                 <div className="col-span-2">{selectedOrder.payment_mode}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Delivery Address</div>
//                 <div className="col-span-2">
//                   {selectedOrder.delivery_address?.address_line}<br />
//                   {selectedOrder.delivery_address?.city}, {selectedOrder.delivery_address?.state}<br />
//                   {selectedOrder.delivery_address?.pincode}<br />
//                   {selectedOrder.delivery_address?.country}<br />
//                   {selectedOrder.delivery_address?.mobile}
//                 </div>
//               </div>
// {userRole === 'ADMIN' && (
//   <div className="grid grid-cols-3 gap-4 text-gray-700">
//     <div className="font-semibold">Status</div>
//     <div className="col-span-2">
//       <select
//         value={selectedStatus}
//         onChange={handleStatusChange}
//         className={`border p-2 rounded w-full
//           ${
//             selectedStatus == "Pending"
//               ? "bg-yellow-100 text-yellow-700"
//               : selectedStatus === "Delivered"
//               ? "bg-green-100 text-green-700"
//               : selectedStatus === "Cancelled"
//               ? "bg-red-100 text-red-700"
//               : selectedStatus === "Dispatch"
//               ? "bg-blue-100 text-blue-700"
//               : ""
//           }`}
//       >
//         <option value="Pending" className="bg-yellow-100 text-yellow-700">Pending</option>
//         <option value="Delivered" className="bg-green-100 text-green-700">Delivered</option>
//         <option value="Cancelled" className="bg-red-100 text-red-700">Cancelled</option>
//         <option value="Dispatch" className="bg-blue-100 text-blue-700">Dispatch</option>
//       </select>
//     </div>
//   </div>
// )}
// {userRole === 'ADMIN' && (
//   <div className="flex justify-end mt-4">
//     <button
//       className="bg-blue-500 text-white px-4 py-2 rounded"
//       onClick={saveStatus}
//     >
//       Save Status
//     </button>
//   </div>
// )}
// <div
//   className={`mt-4 text-lg font-semibold px-4 py-2 rounded
//     ${
//       selectedStatus === "Pending"
//         ? "bg-yellow-100 text-yellow-700"
//         : selectedStatus === "Delivered"
//         ? "bg-green-100 text-green-700"
//         : selectedStatus === "Cancelled"
//         ? "bg-red-100 text-red-700"
//         : selectedStatus === "Dispatch"
//         ? "bg-blue-100 text-blue-700"
//         : "bg-gray-100 text-gray-700"
//     }`}
// >
//   Status: {selectedStatus}
// </div>

             
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;



// ///



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import NoData from '../components/NoData';
// import Notification from '../pages/Notification';

// const MyOrders = () => {
//   const orders = useSelector(state => state.orders.order);
//   const userRole = useSelector(state => state.user.role);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);  // State for filter modal
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);  // State for order details modal
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState('');
//   // const [filteredOrders, setFilteredOrders] = useState(orders);  // New state to hold filtered orders
//   const [notification, setNotification] = useState('');
//   const [searchQuery, setSearchQuery] = React.useState('');
// const [filteredOrders, setFilteredOrders] = React.useState([]);

//   // const [searchQuery, setSearchQuery] = useState("");
//   useEffect(() => {
//     setFilteredOrders(orders);  // Update filtered orders whenever orders state changes
//   }, [orders]);
//   const handleSearch = () => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const results = orders.filter((order) =>
//       order.title.toLowerCase().includes(lowerCaseQuery) || // Replace `title` with the field to search
//       order.description.toLowerCase().includes(lowerCaseQuery) // Add other fields as needed
//     );
//     setFilteredOrders(results);
//   };
  
//   const handleImageClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const openDetailsModal = (order) => {
//     setSelectedOrder(order);
//     setSelectedStatus(order.order_status); // Set the initial status
//     setIsDetailsModalOpen(true);  // Open the details modal
//   };

//   const closeDetailsModal = () => {
//     setIsDetailsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const openFilterModal = () => {
//     setIsFilterModalOpen(true);  // Open the filter modal
//   };

//   const closeFilterModal = () => {
//     setIsFilterModalOpen(false);  // Close the filter modal
//   };

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//   };

//   const saveStatus = async () => {
//     const url = `http://localhost:5000/api/order/${selectedOrder._id}/update-status`;
//     const token = localStorage.getItem('accessToken');

//     try {
//       const response = await axios.put(
//         url,
//         { status: selectedStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         const updatedOrder = response.data;
//         setSelectedOrder(updatedOrder);

//         // Update the orders list with the updated order
//         const updatedOrders = orders.map(order =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         );
//         dispatch({ type: 'UPDATE_ORDERS', payload: updatedOrders });

//         setNotification('Status updated successfully!');
//         closeDetailsModal();
//       } else {
//         setNotification('Error updating status!');
//       }
//     } catch (error) {
//       setNotification('Error updating status!');
//     }
//   };

//   // Handle the filter status change
//   const handleFilterClick = (status) => {
//     if (status) {
//       const filtered = orders.filter(order => order.order_status === status);
//       setFilteredOrders(filtered);
//     } else {
//       setFilteredOrders(orders); // If 'All' is selected, show all orders
//     }
//     closeFilterModal();
//   };

//   return (
//     <div>
//     <div>
//     {/* Search and Filter UI */}
//     <div className="bg-red-100 shadow-md p-4 font-semibold mb-6 flex flex-col gap-4">
//       {/* Header and Search */}
//       <div className="flex justify-between items-center">
//         <h1>My Orders</h1>
//         <button
//           className="bg-red-300 text-red-700 px-4 py-2 rounded"
//           onClick={openFilterModal}
//         >
//           Filter
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search orders..."
//           className="flex-grow border rounded px-4 py-2"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//       </div>
//     </div>

//     {/* Orders List */}
//     <div>
//       {filteredOrders.length > 0 ? (
//         filteredOrders.map((order) => (
//           <div key={order.id} className="p-4 border mb-2 rounded">
//             <h2>{order.title}</h2>
//             <p>{order.description}</p>
//           </div>
//         ))
//       ) : (
//         <p>No matching orders found.</p>
//       )}
//     </div>
//   </div>



//       {!filteredOrders[0] && <NoData />}

//       {filteredOrders.length > 0 && (
//         <table className="min-w-full table-auto mt-5 border-collapse">
//           <thead>
//             <tr className="bg-orange-200 text-left">
//               <th className="border px-4 py-2">Customer Name</th>
//               <th className="border px-4 py-2">Product Name</th>
//               <th className="border px-4 py-2">Image</th>
//               <th className="border px-4 py-2">Amount</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order, index) => (
//               <tr key={order._id + index + "order"} className="border-b">
//                 <td className="border px-4 py-2">{order.userId?.name || 'N/A'}</td>
//                 <td className="border px-4 py-2">{order.product_details.name}</td>
//                 <td className="border px-4 py-2">
//                   <img
//                     src={order.product_details.image[0]}
//                     alt={order.product_details.name}
//                     className="w-14 h-14 object-cover cursor-pointer"
//                     onClick={() => handleImageClick(order.productId._id)}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">₹{order.totalAmt || 'N/A'}</td>
//                 <td className={`border px-4 py-2 ${order.order_status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : order.order_status === 'Delivered' ? "bg-green-100 text-green-700" : order.order_status === 'Cancelled' ? "bg-red-100 text-red-700" : order.order_status === 'Dispatch' ? "bg-blue-100 text-blue-700" : ''}`}>
//                   {order.order_status}
//                 </td>
//                 <td className="border px-4 py-2">
//                   <button
//                     className="bg-red-700 text-white px-4 py-2 rounded"
//                     onClick={() => openDetailsModal(order)}  // Open the order details modal
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {notification && (
//         <Notification message={notification} onClose={() => setNotification('')} />
//       )}

//       {/* Order Details Modal */}
//       {isDetailsModalOpen && selectedOrder && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-full sm:w-96 max-w-lg relative overflow-auto">
//             <button
//               className="absolute top-2 right-2 text-2xl font-bold text-red-600 hover:text-black"
//               onClick={closeDetailsModal}  // Close the details modal
//             >
//               &times;
//             </button>


//             {/* Order Details */}
//             <h2 className="text-xl font-semibold mb-4">Order Details</h2>
//             <div className="space-y-4">

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Order ID</div>
//                 <div className="col-span-2">{selectedOrder._id}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Product Name</div>
//                 <div className="col-span-2">{selectedOrder.product_details?.name}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Product ID</div>
//                 <div className="col-span-2">{selectedOrder.productId?._id}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">User ID</div>
//                 <div className="col-span-2">{selectedOrder.userId?._id}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">User Name</div>
//                 <div className="col-span-2">{selectedOrder.userId?.name}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Amount</div>
//                 <div className="col-span-2">₹{selectedOrder.totalAmt}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Payment Mode</div>
//                 <div className="col-span-2">{selectedOrder.payment_mode}</div>
//               </div>

//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Delivery Address</div>
//                 <div className="col-span-2">
//                   {selectedOrder.delivery_address?.address_line}<br />
//                   {selectedOrder.delivery_address?.city}, {selectedOrder.delivery_address?.state}<br />
//                   {selectedOrder.delivery_address?.pincode}<br />
//                   {selectedOrder.delivery_address?.country}<br />
//                   {selectedOrder.delivery_address?.mobile}
//                 </div>
//               </div>

//               {/* Status update for Admin */}
//               {userRole === 'ADMIN' && (
//                 <div className="mt-4">
//                   <label htmlFor="status" className="block font-medium">Update Status</label>
//                   <select
//                     id="status"
//                     value={selectedStatus}
//                     onChange={handleStatusChange}
//                     className="border px-4 py-2 rounded w-full"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                     <option value="Dispatch">Dispatch</option>
//                   </select>
//                 </div>
//               )}

//               {userRole === 'ADMIN' && (
//                 <div className="mt-6 flex justify-end">
//                   <button
//                     onClick={saveStatus}
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Filter Modal */}
//       {isFilterModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Filter Orders</h2>
//             <div className="space-y-4">
//               <button
//                 onClick={() => handleFilterClick('Pending')}
//                 className="block w-full text-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded"
//               >
//                 Pending
//               </button>
//               <button
//                 onClick={() => handleFilterClick('Delivered')}
//                 className="block w-full text-center px-4 py-2 bg-green-100 text-green-700 rounded"
//               >
//                 Delivered
//               </button>
//               <button
//                 onClick={() => handleFilterClick('Cancelled')}
//                 className="block w-full text-center px-4 py-2 bg-red-100 text-red-700 rounded"
//               >
//                 Cancelled
//               </button>
//               <button
//                 onClick={() => handleFilterClick('Dispatch')}
//                 className="block w-full text-center px-4 py-2 bg-blue-100 text-blue-700 rounded"
//               >
//                 Dispatch
//               </button>
//               <button
//                 onClick={() => handleFilterClick('')}
//                 className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded"
//               >
//                 Show All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;

//new



// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import NoData from '../components/NoData';
// import Notification from '../pages/Notification';
// const MyOrders = () => {
//   const orders = useSelector(state => state.orders.order);
//   const userRole = useSelector(state => state.user.role);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [filteredOrders, setFilteredOrders] = useState(orders);
//   const [notification, setNotification] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     setFilteredOrders(orders);
//   }, [orders]);

//   const handleImageClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const openDetailsModal = (order) => {
//     setSelectedOrder(order);
//     setSelectedStatus(order.order_status);
//     setIsDetailsModalOpen(true);
//   };

//   const closeDetailsModal = () => {
//     setIsDetailsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const openFilterModal = () => {
//     setIsFilterModalOpen(true);
//   };

//   const closeFilterModal = () => {
//     setIsFilterModalOpen(false);
//   };

//   const handleStatusChange = (e) => {
//     setSelectedStatus(e.target.value);
//   };

//   const saveStatus = async () => {
//     const url = `http://localhost:5000/api/order/${selectedOrder._id}/update-status`;
//     const token = localStorage.getItem('accessToken');

//     try {
//       const response = await axios.put(
//         url,
//         { status: selectedStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         const updatedOrder = response.data;
//         setSelectedOrder(updatedOrder);

//         const updatedOrders = orders.map(order =>
//           order._id === updatedOrder._id ? updatedOrder : order
//         );
//         dispatch({ type: 'UPDATE_ORDERS', payload: updatedOrders });

//         setNotification('Status updated successfully!');
//         closeDetailsModal();
//       } else {
//         setNotification('Error updating status!');
//       }
//     } catch (error) {
//       setNotification('Error updating status!');
//     }
//   };

//   const handleFilterClick = (status) => {
//     if (status) {
//       const filtered = orders.filter(order => order.order_status === status);
//       setFilteredOrders(filtered);
//     } else {
//       setFilteredOrders(orders);
//     }
//     closeFilterModal();
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = orders.filter(order => 
//       order.userId?.name.toLowerCase().includes(query) ||
//       order.product_details?.name.toLowerCase().includes(query) ||
//       order.order_status.toLowerCase().includes(query)
//     );
//     setFilteredOrders(filtered);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   return (
//     <div>
//       <div className="bg-red-100 shadow-md p-4 font-semibold mb-6 flex justify-between items-center">
//         <h1>My Orders</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Search orders..."
//             className="border px-4 py-2 rounded"
//           />
//           <button
//             className="bg-red-300 text-red-700 px-4 py-2 rounded"
//             onClick={openFilterModal}
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {!currentOrders.length && <NoData />}

//       {currentOrders.length > 0 && (
//         <table className="min-w-full table-auto mt-5 border-collapse">
//           <thead>
//             <tr className="bg-orange-200 text-left">
//               <th className="border px-4 py-2">Customer Name</th>
//               <th className="border px-4 py-2">Product Name</th>
//               <th className="border px-4 py-2">Image</th>
//               <th className="border px-4 py-2">Amount</th>
//               <th className="border px-4 py-2">Status</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentOrders.map((order, index) => (
//               <tr key={order._id + index + "order"} className="border-b">
//                 <td className="border px-4 py-2">{order.userId?.name || 'N/A'}</td>
//                 <td className="border px-4 py-2">{order.product_details.name}</td>
//                 <td className="border px-4 py-2">
//                   <img
//                     src={order.product_details.image[0]}
//                     alt={order.product_details.name}
//                     className="w-14 h-14 object-cover cursor-pointer"
//                     onClick={() => handleImageClick(order.productId._id)}
//                   />
//                 </td>
//                 <td className="border px-4 py-2">₹{order.totalAmt || 'N/A'}</td>
//                 <td className={`border px-4 py-2 ${order.order_status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : order.order_status === 'Delivered' ? "bg-green-100 text-green-700" : order.order_status === 'Cancelled' ? "bg-red-100 text-red-700" : order.order_status === 'Dispatch' ? "bg-blue-100 text-blue-700" : ''}`}>
//                   {order.order_status}
//                 </td>
//                 <td className="border px-4 py-2">
//                   <button
//                     className="bg-red-700 text-white px-4 py-2 rounded"
//                     onClick={() => openDetailsModal(order)}
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {filteredOrders.length > itemsPerPage && (
//         <div className="flex justify-center space-x-2 mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {notification && (
//         <Notification message={notification} onClose={() => setNotification('')} />
//       )}

//       {isDetailsModalOpen && selectedOrder && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-full sm:w-96 max-w-lg relative overflow-auto">
//             <button
//               className="absolute top-2 right-2 text-2xl font-bold text-red-600 hover:text-black"
//               onClick={closeDetailsModal}
//             >
//               &times;
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Order Details</h2>
//             <div className="space-y-4">
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Order ID</div>
//                 <div className="col-span-2">{selectedOrder._id}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Product Name</div>
//                 <div className="col-span-2">{selectedOrder.product_details?.name}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Product ID</div>
//                 <div className="col-span-2">{selectedOrder.productId?._id}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">User ID</div>
//                 <div className="col-span-2">{selectedOrder.userId?._id}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">User Name</div>
//                 <div className="col-span-2">{selectedOrder.userId?.name}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Amount</div>
//                 <div className="col-span-2">₹{selectedOrder.totalAmt}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Payment Mode</div>
//                 <div className="col-span-2">{selectedOrder.payment_mode}</div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-gray-700">
//                 <div className="font-semibold">Delivery Address</div>
//                 <div className="col-span-2">
//                   {selectedOrder.delivery_address?.address_line}<br />
//                   {selectedOrder.delivery_address?.city}, {selectedOrder.delivery_address?.state}<br />
//                   {selectedOrder.delivery_address?.pincode}<br />
//                   {selectedOrder.delivery_address?.country}<br />
//                   {selectedOrder.delivery_address?.mobile}
//                 </div>
//               </div>
//               {userRole === 'ADMIN' && (
//                 <div className="mt-4">
//                   <label htmlFor="status" className="block font-medium">Update Status</label>
//                   <select
//                     id="status"
//                     value={selectedStatus}
//                     onChange={handleStatusChange}
//                     className="border px-4 py-2 rounded w-full"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                     <option value="Dispatch">Dispatch</option>
//                   </select>
//                 </div>
//               )}
//               {userRole === 'ADMIN' && (
//                 <div className="mt-6 flex justify-end">
//                   <button
//                     onClick={saveStatus}
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {isFilterModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Filter Orders</h2>
//             <div className="space-y-4">
//               <button
//                 onClick={() => handleFilterClick('Pending')}
//                 className="block w-full text-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded"
//               >
//                 Pending
//               </button>
//               <button
//                 onClick={() => handleFilterClick('Delivered')}
//                 className="block w-full text-center px-4 py-2 bg-green-100 text-green-700 rounded"
//               >
//                 Delivered
//               </button>
//               <button
//                 onClick={() => handleFilterClick('Cancelled')}
//                 className="block w-full text-center px-4 py-2 bg-red-100 text-red-700 rounded"
//               >
//                 Cancelled
//               </button>
//               <button
//                 onClick={() => handleFilterClick('Dispatch')}
//                 className="block w-full text-center px-4 py-2 bg-blue-100 text-blue-700 rounded"
//               >
//                 Dispatch
//               </button>
//               <button
//                 onClick={() => handleFilterClick('')}
//                 className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded"
//               >
//                 Show All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;