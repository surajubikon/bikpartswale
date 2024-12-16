import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import Joi from "joi";
import PaymentModel from "../models/payment.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";

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

// Cash on Delivery Order
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
            paymentId: null,
            payment_status: "PENDING",
            delivery_address: addressId,
            totalAmt,
        }));

        const generatedOrder = await OrderModel.insertMany(payload);

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
            amount: amount * 100,
            currency: currency || "INR",
            receipt: `receipt_${new mongoose.Types.ObjectId()}`,
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

// Verify Razorpay Payment
export async function verifyRazorpayPaymentController(request, response) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, list_items, totalAmt, addressId } = request.body;
        const userId = request.userId;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return response.status(400).json({ success: false, message: "Payment verification failed" });
        }

        const paymentRecord = await PaymentModel.create([{
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "PAID",
            amount: totalAmt,
            userId,
        }], { session });

        const payload = list_items.map((el) => ({
            userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            productId: el.productId._id,
            product_details: { name: el.productId.name, image: el.productId.image },
            paymentId: razorpay_payment_id,
            payment_status: "PAID",
            delivery_address: addressId,
            totalAmt,
        }));

        const generatedOrder = await OrderModel.insertMany(payload, { session });

        await CartProductModel.deleteMany({ userId }, { session });
        await UserModel.findOneAndUpdate({ _id: userId }, { shopping_cart: [] }, { session });

        await session.commitTransaction();

        return response.status(200).json({
            success: true,
            message: "Payment verified and order placed successfully",
            data: generatedOrder,
            paymentDetails: paymentRecord,
        });
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return response.status(500).json({
            success: false,
            message: error.message || "Payment verification failed",
        });
    } finally {
        session.endSession();
    }
}

// Get Order Details
export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId // order id

        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Get All Orders (Admin)
// export async function getAllOrdersController(request, response) {
//     try {
//         if (!request.isAdmin) {
//             return response.status(403).json({ success: false, message: "Access denied. Only admins can view this data." });
//         }

//         const allOrders = await OrderModel.find()
//             .sort({ createdAt: -1 })
//             .populate("delivery_address");

//         return response.status(200).json({
//             success: true,
//             message: "All orders retrieved successfully",
//             data: allOrders,
//         });
//     } catch (error) {
//         console.error(error);
//         return response.status(500).json({
//             success: false,
//             message: error.message || "Failed to retrieve orders",
//         });
//     }
// }
