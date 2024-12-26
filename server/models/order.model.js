import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    orderId : {
        type : String,
        required : [true, "Provide orderId"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    product_details : {
        name : String,
        image : Array,
    },
    paymentId : {
        type : String,
        default : ""
    },
    payment_status: {
        type: String,
        default: ''  // E.g., 'Paid', 'Pending'
      },
    payment_mode: {
        type: String,
        default: ''  // Payment method (e.g., 'Credit Card', 'Paypal', etc.)
      },
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : 'address'
    },
    subTotalAmt : {
        type : Number,
        default : 0
    },
    totalAmt : {
        type : Number,
        default : 0
    },
    invoice_receipt : {
        type : String,
        default : ""
    },
    sales: {
        type: Number,
        default: 0 // Jab naya product banega to sales default 0 hogi
    },
    order_status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Pending'  // Default status when an order is placed
    },
},{
    timestamps : true
})

const OrderModel = mongoose.model('order',orderSchema)

export default OrderModel