// controllers/subbrand.controller.js

import SubBrand from '../models/SubBrand.js';
import Brand from '../models/brandsmodel.model.js';

// Add SubBrand
export const addSubBrandController = async (req, res) => {
  try {
    const { name, category, image } = req.body;

    if (!name || !category || !image) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    // Check if the Brand exists
    const brandExists = await Brand.findById(category);
    if (!brandExists) {
      return res.status(404).json({
        message: "Brand not found",
        error: true,
        success: false,
      });
    }

    const newSubBrand = new SubBrand({
      name,
      category,
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

// Get all SubBrands by Category (Brand)
export const getSubBrandsByCategoryController = async (req, res) => {
  try {
    const subBrands = await SubBrand.find({ category: req.params.categoryId })
      .populate('category', 'name') // to get brand details in subbrand
      .sort({ createdAt: -1 });

    return res.json({
      data: subBrands,
      error: false,
      success: true,
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
    const { _id, name, category, image } = req.body;

    const updatedSubBrand = await SubBrand.findByIdAndUpdate(
      _id,
      { name, category, image },
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
