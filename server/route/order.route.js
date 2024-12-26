import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
    CashOnDeliveryOrderController,
    createRazorpayOrderController,
    verifyRazorpayPaymentController,
    getOrderDetailsController,
    updateOrderStatusController
    
} from '../controllers/order.controller.js';

const orderRouter = Router();

// Cash on Delivery Order
orderRouter.post('/cash-on-delivery', auth, CashOnDeliveryOrderController);

// Create Razorpay Order
orderRouter.post('/create-order', auth, createRazorpayOrderController);

// Verify Razorpay Payament
orderRouter.post('/verify-payment', auth, verifyRazorpayPaymentController);

// Get Order List
orderRouter.get('/order-list', auth, getOrderDetailsController);
// orderRouter.put('/updateStatus/:orderId',auth, updateOrderStatusController);

orderRouter.put('/:orderId/update-status', auth, updateOrderStatusController);

export default orderRouter;
