// controllers/subbrand.controller.js

import SubBrand from '../models/SubBrand.js';
import Brand from '../models/brandsmodel.model.js';

// Add SubBrand
export const addSubBrandController = async (req, res) => {
  try {
      const { name, brand, image } = req.body;

      if (!name || !brand || !image) {
          return res.status(400).json({
              message: "All fields are required",
              error: true,
              success: false,
          });
      }

      // Ensure all brand IDs exist
      const brandsExist = Array.isArray(brand)
          ? await Promise.all(brand.map((id) => Brand.findById(id)))
          : [await Brand.findById(brand)];

      if (brandsExist.some((b) => !b)) {
          return res.status(404).json({
              message: "One or more Brand IDs not found",
              error: true,
              success: false,
          });
      }

      const newSubBrand = new SubBrand({
          name,
          brand, // Save the brand array or single ID
          image,
      });

      const savedSubBrand = await newSubBrand.save();

      return res.json({
          message: "SubBrand added successfully",
          data: savedSubBrand,
          success: true,
          error: false,
      });
  } catch (error) {
      return res.status(500).json({
          message: error.message || error,
          error: true,
          success: false,
      });
  }
};




// controllers/subbrand.controller.js
export const getSubBrandsByCategoryController = async (req, res) => {
  try {
    const subBrands = await SubBrand.find().populate('brand', 'name');
    return res.json({
      data: subBrands,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Update SubBrand
export const updateSubBrandController = async (req, res) => {
  try {
    const { _id, name, brand, image } = req.body;

    const updatedSubBrand = await SubBrand.findByIdAndUpdate(
      _id,
      { name, brand, image },
      { new: true }
    );

    return res.json({
      message: "SubBrand updated successfully",
      success: true,
      error: false,
      data: updatedSubBrand,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Delete SubBrand
export const deleteSubBrandController = async (req, res) => {
  try {
    const { _id } = req.body;

    const deletedSubBrand = await SubBrand.findByIdAndDelete(_id);

    return res.json({
      message: "SubBrand deleted successfully",
      data: deletedSubBrand,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
