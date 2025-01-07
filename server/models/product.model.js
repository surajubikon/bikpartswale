import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    image : {
        type : Array,
        default : []
    },
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'subCategory'
        }
    ],
    brand:[
        {
            type : mongoose.Schema.ObjectId,
            ref : 'brand'
        }
    ],
    subBrand:[
        {
        type : mongoose.Schema.ObjectId,
        ref : 'subBrand'
    }
    ],
    unit : {
        type : String,
        default : ""
    },
    stock : {
        type : Number,
        default : null
    },
    price : {
        type : Number,
        default : null
    },
    discount : {
        type : Number,
        default : null
    },
    description : {
        type : String,
        default : ""
    },
    more_details : {
        type : Object,
        default : {}
    },
    publish : {
        type : Boolean,
        default : true
    },
    sales: {
        type: Number,
        default: 0 // Jab naya product banega to sales default 0 hogi
    },
    
},{
    timestamps : true
})

//create a text index
productSchema.index({
    name: 'text',
    description: 'text'
}, {
    weights: {
        name: 10,
        description: 5
    },
    default_language: 'english' // You can specify the language here (optional)
});

const ProductModel = mongoose.model('product',productSchema)

export default ProductModel
