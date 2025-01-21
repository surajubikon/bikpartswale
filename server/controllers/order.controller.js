import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import Joi from "joi";
import PaymentModel from "../models/payment.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
// Define Joi Schema
const codOrderSchema = Joi.object({
    list_items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
        }).required()
    ),
    totalAmt: Joi.number().required(),
    addressId: Joi.string().required(),
});

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

export async function CashOnDeliveryOrderController(request, response) {
    try {
        const { list_items, totalAmt, addressId } = request.body;
        const userId = request.userId; // From auth middleware

        const payload = list_items.map((el) => ({
            userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            productId: el.productId._id,
            product_details: {
                name: el.productId.name,
                image: el.productId.image,
            },
            paymentId: "",
            payment_status: "PENDING",
            payment_mode: "Cash on Delivery",
            delivery_address: addressId,
            totalAmt,
            quantity: el.quantity, // Include quantity in the order
        }));

        // Increment salesCount and check stock for each product
        await Promise.all(
            list_items.map(async (el) => {
                const product = await ProductModel.findById(el.productId._id);

                if (!product) {
                    throw new Error(`Product with ID ${el.productId._id} not found`);
                }

                if (product.stock < el.quantity) {
                    throw new Error(`Not enough stock for product "${product.name}". Available: ${product.stock}`);
                }

                // Decrement stock by the quantity of the product bought
                await ProductModel.findByIdAndUpdate(el.productId._id, {
                    $inc: { salesCount: el.quantity, stock: -el.quantity },
                });

                // If stock becomes 0, mark as sold out
                if (product.stock - el.quantity === 0) {
                    await ProductModel.findByIdAndUpdate(el.productId._id, {
                        soldOut: true, // Mark as sold out
                    });
                }
            })
        );

        const generatedOrder = await OrderModel.insertMany(payload);

        // Clear the user's cart after the order is placed
        await CartProductModel.deleteMany({ userId });
        await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });

        return response.status(200).json({
            success: true,
            message: "Cash on Delivery order placed successfully",
            data: generatedOrder,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || "Failed to place Cash on Delivery order",
        });
    }
}



// Create Razorpay Order
export async function createRazorpayOrderController(request, response) {
    try {
        const { amount, currency } = request.body;

        const options = {
            amount: amount * 100, // amount in paisa (Razorpay accepts in paisa)
            currency: currency || "INR",
            receipt: `receipt_${new mongoose.Types.ObjectId()}`, // generate unique receipt
        };

        const razorpayOrder = await razorpay.orders.create(options);

        return response.status(200).json({
            success: true,
            data: razorpayOrder,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || "Failed to create Razorpay order",
        });
    }
}

export async function verifyRazorpayPaymentController(request, response) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, list_items, totalAmt, addressId } = request.body;
        const userId = request.userId;

        // Generate signature to verify payment
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return response.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Create payment record in the database
        const paymentRecord = await PaymentModel.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "PAID",
            amount: totalAmt,
            userId,
        });

        // Prepare order payload for insertion
        const payload = list_items.map((el) => ({
            userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            productId: el.productId._id,
            product_details: { name: el.productId.name, image: el.productId.image },
            paymentId: razorpay_payment_id,
            payment_status: "PAID",
            payment_mode: "Online Payment",
            delivery_address: addressId,
            totalAmt,
            quantity: el.quantity, // Include quantity in the order
        }));

        // Handle stock and "sold out" logic
        await Promise.all(
            list_items.map(async (el) => {
                const product = await ProductModel.findById(el.productId._id);

                if (!product) {
                    throw new Error(`Product with ID ${el.productId._id} not found`);
                }

                // Check if enough stock is available
                if (product.stock < el.quantity) {
                    throw new Error(`Not enough stock for product "${product.name}". Available: ${product.stock}`);
                }

                // Decrement stock by the quantity of the product bought
                await ProductModel.findByIdAndUpdate(el.productId._id, {
                    $inc: { salesCount: el.quantity, stock: -el.quantity },
                });

                // If stock becomes 0, mark as sold out
                if (product.stock - el.quantity === 0) {
                    await ProductModel.findByIdAndUpdate(el.productId._id, {
                        soldOut: true, // Mark as sold out
                    });
                }
            })
        );

        // Insert order records in the database
        const generatedOrder = await OrderModel.insertMany(payload);

        // Clear user's cart after placing the order
        await CartProductModel.deleteMany({ userId });
        await UserModel.findOneAndUpdate({ _id: userId }, { shopping_cart: [] });

        return response.status(200).json({
            success: true,
            message: "Payment verified and order placed successfully",
            data: generatedOrder,
            paymentDetails: paymentRecord,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || "Payment verification failed",
        });
    }
}



// Get Order Details
export async function getOrderDetailsController(request, response) {
    try {
        const userId = request.userId; // From auth middleware
        const user = await UserModel.findById(userId); // Fetch the user's details

        // If the user is an admin, show all orders
        if (user.role === 'ADMIN') {
            const orderlist = await OrderModel.find()
                .sort({ createdAt: -1 })
                .populate('userId')
                .populate('delivery_address') // Populate the delivery address
                .populate('productId'); // Populate product details
        
            return response.json({
                message: "All orders for admin",
                data: orderlist,
                error: false,
                success: true
            });
        }
        
        // If the user is not an admin, show only their own orders
        const orderlist = await OrderModel.find({ userId: userId })
            .sort({ createdAt: -1 })
            .populate('delivery_address') // Populate the delivery address
            .populate('productId'); // Populate product details
        
        return response.json({
            message: "User's order list",
            data: orderlist,
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// Update Order Status by Admin
export async function updateOrderStatusController(request, response) {
    try {
        const { status } = request.body;  // Get the new status from the body
        const { orderId } = request.params; // Get the orderId from the URL parameters
        const userId = request.userId; // From auth middleware (assuming userId is set)
     


        // Check if the user is admin
        const user = await UserModel.findById(userId);
        if (user.role !== 'ADMIN') {
            return response.status(403).json({
                success: false,
                message: "You are not authorized to update order status",
            });
        }

        // Update the order status in the database
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { order_status: status }, // Update the correct field
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return response.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Send the updated order details as response
        return response.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || "Failed to update order status",
        });
    }
}