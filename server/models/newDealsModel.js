import mongoose from "mongoose";

const newDealSchema = new mongoose.Schema({
    name: String,
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'product', // Reference to the Product model
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const NewDeal = mongoose.model('newdeal', newDealSchema);

export default NewDeal;