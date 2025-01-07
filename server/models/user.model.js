import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // added email validation
    },
    password: {
        type: String,
        required: [true, "Provide password"],
    },
    avatar: {
        type: String,
        default: "",
    },
    mobile: {
        type: Number,
        default: null,
    },
    refresh_token: {
        type: String,
        default: "",
    },
    verify_email: {
        type: Boolean,
        default: false,
    },
    last_login_date: {
        type: Date,
        default: Date.now, // Set the default as the current date
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active",
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "address",
        },
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "cartProduct",
        },
    ],
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "order",
        },
    ],
    forgot_password_otp: {
        type: String,
        default: null,
    },
    forgot_password_expiry: {
        type: Date,
        default: null,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    otp: {
        type: String,
        default: null,
    },
    newOtp: {
        type: String,
        default: null,
    },
    otp_expiry: {
        type: Date,
        default: null,
    },
    login_attempts: {
        type: Number,
        default: 0,
    },
    preferences: {
        type: Map,
        of: String,
        default: {}, // To store dynamic preferences of users
    },
}, {
    timestamps: true, // automatically adds createdAt and updatedAt
});

// Create a UserModel based on the schema
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
