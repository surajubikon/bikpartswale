// models/SubBrand.js

import mongoose from 'mongoose';

const subBrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {  // This will link to the Brand
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brand',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const SubBrand = mongoose.model('subBrand', subBrandSchema);

export default SubBrand;
