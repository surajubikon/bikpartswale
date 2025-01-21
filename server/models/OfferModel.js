import mongoose from "mongoose";

const newTaglineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensuring the name is required
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const NewTagline = mongoose.model('taglines', newTaglineSchema); // Model name is 'taglines'

export default NewTagline;
