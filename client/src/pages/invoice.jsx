import { jsPDF } from "jspdf";

const generateInvoice = (order) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text("Invoice", 14, 20);
  
  // Order ID
  doc.setFontSize(14);
  doc.text(`Order ID: ${order._id}`, 14, 30);
  
  // User Details
  doc.text(`User Name: ${order.userId?.name || 'N/A'}`, 14, 40);
  doc.text(`Mobile: ${order.delivery_address?.mobile || 'N/A'}`, 14, 50);
  doc.text(`Address: ${order.delivery_address?.address_line || 'N/A'}, ${order.delivery_address?.city || 'N/A'}`, 14, 60);
  doc.text(`${order.delivery_address?.state || ''}, ${order.delivery_address?.country || ''} - ${order.delivery_address?.pincode || ''}`, 14, 70);
  
  // Product Details
  doc.text(`Product Name: ${order.product_details?.name}`, 14, 80);
  doc.text(`Amount: ₹${order.totalAmt || 'N/A'}`, 14, 90);

  // Order Status
  doc.text(`Status: ${order.order_status}`, 14, 100);

  // Add some extra space and the footer
  doc.text("Thank you for your purchase!", 14, 110);
  
  // Save the PDF (downloadable)
  doc.save(`Invoice_${order._id}.pdf`);
};
