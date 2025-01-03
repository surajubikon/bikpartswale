import mongoose from "mongoose";

const BrandsModelSchema = new mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})


const BrandsModel = mongoose.model('brand', BrandsModelSchema);  // Correct model name


export default BrandsModel