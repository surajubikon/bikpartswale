import Banner from "../models/banner.model.js"
import mongoose from "mongoose";
export const CreateBannerController = async (request, response) => {
    try {
        const { image } = request.body;

        if (!image) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            });
        }

        const AddBanner = new Banner({
            image
        });

        const saveBanner = await AddBanner.save();

        if (!saveBanner) {
            return response.status(500).json({
                message: "Not Created",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Add Banner Successfully",
            data: saveBanner,
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
// Get All Banners
export const getBannerController = async (request, response) => {
    try {
        const banners = await Banner.find();

        if (!banners || banners.length === 0) {
            return response.status(404).json({
                message: "No banners found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Banners fetched successfully",
            data: banners,
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Backend: Update Banner API
export const updateBannerController = async (request, response) => {
    try {
        const { id } = request.params;  // ID should come from the URL parameter
        const { image } = request.body;  // Image should come from the request body

        if (!image) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            });
        }

        // Find and update the banner by ID
        const updatedBanner = await Banner.findByIdAndUpdate(
            id,
            { image },  // Update the banner with the new image
            { new: true }  // Return the updated banner object
        );

        if (!updatedBanner) {
            return response.status(404).json({
                message: "Banner not found",
                error: true,
                success: false
            });
        }

        // Respond with success message and updated banner data
        return response.json({
            message: "Banner updated successfully",
            data: updatedBanner,
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};


export const deleteBannerController = async (request, response) => {
    try {
        const { id } = request.body;  // Accept id from request body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).json({
                message: "Invalid ID format",
                error: true,
                success: false
            });
        }

        const deletedBanner = await Banner.findByIdAndDelete(id);

        if (!deletedBanner) {
            return response.status(404).json({
                message: "Banner not found",
                error: true,
                success: false
            });
        }

        return response.json({
            message: "Banner deleted successfully",
            success: true,
            error: false
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
