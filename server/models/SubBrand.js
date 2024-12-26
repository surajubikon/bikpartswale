// models/SubBrand.js

import mongoose from 'mongoose';

const subBrandSchema = new mongoose.Schema({
  name: {
    type: String,
   default : ""
  },
  image: {
    type: String,
    default : ""
  },
  brand: [
    {
    type: mongoose.Schema.ObjectId,
    ref: "brand",
    required: true,  // Corrected reference to the Brand model
  }
  ]
}, {
  timestamps: true,
});

const SubBrand = mongoose.model('subBrands', subBrandSchema);

export default SubBrand;
