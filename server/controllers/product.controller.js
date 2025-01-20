import NewDeal from "../models/newDealsModel.js";
import ProductModel from "../models/product.model.js";
import Rating from "../models/ratingSchema.js"; // Add this line to import the Rating model

export const createProductController = async(request,response)=>{
    try {
        const { 
            name ,
            image ,
            category,
            subCategory,
            brand,
            subBrand,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        } = request.body 

        if(!name || !image[0] || !category[0] || !subCategory[0]|| !brand[0] || !subBrand[0] || !unit || !price || !description ){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }
 // Sold out logic - If stock is 0, set 'soldOut' to true
 const isSoldOut = stock <= 0;
        const product = new ProductModel({
            name ,
            image ,
            category,
            subCategory,
            brand,
            subBrand,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,

              soldOut: isSoldOut // Add soldOut field to track availability
        })
        const saveProduct = await product.save()

        return response.json({
            message : "Product Created Successfully",
            data : saveProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductController = async(request,response)=>{
    try {
        
        let { page, limit, search } = request.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 50
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory brand subBrand'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategory = async(request,response)=>{
    try {
        const { id } = request.body 

        if(!id){
            return response.status(400).json({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({ 
            category : { $in : id }
        }).limit(50)

        return response.json({
            message : "category product list",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByBrand = async(request,response)=>{
    try {
        const { id } = request.body 

        if(!id){
            return response.status(400).json({
                message : "provide brand id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({ 
            brand : { $in : id }
        }).limit(15)

        return response.json({
            message : "brand product list",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const getProductByCategoryAndSubCategory  = async(request,response)=>{
    try {
        const { categoryId,subCategoryId, page,limit } = request.body

        if(!categoryId || !subCategoryId){
            return response.status(400).json({
                message : "Provide categoryId and subCategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 20
        }

        const query = {
            category : { $in :categoryId  },
            subCategory : { $in : subCategoryId },
          

        }

        const skip = (page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product list",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
// brand
export const getProductByBrandAndSubBrand  = async(request,response)=>{
    try {
        const { brandId,subBrandId, page,limit } = request.body

        if(!brandId || !subBrandId){
            return response.status(400).json({
                message : "Provide BrandId and subBrandId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 20
        }

        const query = {
        
            brand : { $in : brandId },
            subBrand : { $in : subBrandId }

        }

        const skip = (page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product list",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductDetails = async(request,response)=>{
    try {
        const { productId } = request.body 

        const product = await ProductModel.findOne({ _id : productId })


        return response.json({
            message : "product details",
            data : product,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update product
export const updateProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide product _id",
                error : true,
                success : false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id : _id },{
            ...request.body
        })

        return response.json({
            message : "updated successfully",
            data : updateProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//delete product
export const deleteProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id })

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//search product
export const searchProduct = async(request,response)=>{
    try {
        let { search, page , limit } = request.body 

        if(!page){
            page = 1
        }
        if(!limit){
            limit  = 50
        }

        const query = search ? {
            $text : {

                $search : search
            }
        } : {}

        const skip = ( page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt  : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            data : data,
            totalCount :dataCount,
            totalPage : Math.ceil(dataCount/limit),
            page : page,
            limit : limit 
        })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
export const getTopSellingProducts = async (request, response) => {
    try {
        const { limit } = request.query; // User kitne top products dekhna chahta hai
        const topProducts = await ProductModel.find()
            .sort({ sales: -1 }) // Descending order me sort
            .limit(parseInt(limit) || 10 ); // Default limit 10 rakho

        return response.json({
            message: "Top-selling products list",
            data: topProducts,
            error: false,
            success: true,
           
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

export const addRatingComment = async (req, res) => {
    try {
        const { productId, rating, comment, username } = req.body;
        const userId = req.user._id;

        if (!productId || !rating || !comment || !username) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newRating = new Rating({
            productId,
            userId,
            rating,
            comment,
            username, // Include the username field
        });
        await newRating.save();

        return res.status(201).json({
            success: true,
            message: 'Rating and comment added successfully',
            data: newRating,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error adding rating/comment',
            error: error.message,
        });
    }
};

// Get all ratings and comments for a product
export const getRatingComments = async (req, res) => {
    try {
        const { productId } = req.query;

        const ratings = await Rating.find({ productId }).populate('userId', 'name'); // Populate user details if needed
        res.status(200).json({ success: true, data: ratings });
    } catch (error) {
        console.error('Error fetching ratings/comments:', error); // Add logging
        res.status(500).json({ success: false, message: 'Error fetching ratings/comments', error: error.message });
    }
};

// Delete a rating/comment
export const deleteRatingComment = async (req, res) => {
    try {
        const { ratingId } = req.body;

        const deletedRating = await Rating.findByIdAndDelete(ratingId);
        if (!deletedRating) {
            return res.status(404).json({ success: false, message: 'Rating/comment not found' });
        }

        res.status(200).json({ success: true, message: 'Rating/comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting rating/comment:', error); // Add logging
        res.status(500).json({ success: false, message: 'Error deleting rating/comment', error: error.message });
    }
};

export const createnewdealController = async (req, res) => {
    try {
        // Destructure the incoming data from the request body
        const { product, price, name } = req.body;

        // Validate required fields
        if (!product || !price || !name) {
            return res.status(400).json({
                message: 'Product, Price, and Name are required',
                error: true,
                success: false,
            });
        }
        // Create a new deal using the validated and sanitized data
        const newDeal = new NewDeal({
            name,
            product,
            price, // Ensure this matches your schema field
           
        });

        // Save the new deal
        const savedDeal = await newDeal.save();

        // Return success response
        return res.status(201).json({
            message: 'New deal created successfully',
            data: savedDeal,
            error: false,
            success: true,
        });
    } catch (error) {
        // Catch any errors and send appropriate response
        return res.status(500).json({
            message: error.message || 'Server error',
            error: true,
            success: false,
        });
    }
};

export const getNewDealsController = async (req, res) => {
    try {
       
        const dealProducts = await NewDeal.find({}).populate('product')  // Populating the 'product' field with product details
        
        return res.json({
            message: 'New deal products list',
            data: dealProducts,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Server error',
            error: true,
            success: false,
        });
    }
};
export const getSingleNewDealController = async (req, res) => {
    try {
        const { id } = req.params;

        const deal = await NewDeal.findById(id);

        if (!deal) {
            return res.status(404).json({
                message: 'Deal not found',
                error: true,
                success: false,
            });
        }

        return res.json({
            message: 'Deal details retrieved successfully',
            data: deal,
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Server error',
            error: true,
            success: false,
        });
    }
};
export const updateNewDealController = async (req, res) => {

    try {
        const { id } = req.params;  // Deal ID is expected in the URL
        const { name, price } = req.body; // Accept name and price in the body

        // Update only name and price
        const updatedDeal = await NewDeal.findByIdAndUpdate(
            id, // Correctly reference the ID from the URL
            { name, price }, // Update fields
            { new: true } // Ensure the updated document is returned
        );

        if (!updatedDeal) {
            return res.status(404).json({
                message: 'Deal not found',
                error: true,
                success: false,
            });
        }

        return res.json({
            message: 'Deal updated successfully',
            data: updatedDeal,
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Server error',
            error: true,
            success: false,
        });
    }
};

export const deleteNewDealController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDeal = await NewDeal.findByIdAndDelete(id);

        if (!deletedDeal) {
            return res.status(404).json({
                message: 'Deal not found',
                error: true,
                success: false,
            });
        }

        return res.json({
            message: 'Deal deleted successfully',
            data: deletedDeal,
            error: false,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Server error',
            error: true,
            success: false,
        });
    }
};


export const getAllProducts = async (req, res) => {
    try {
      const products = await ProductModel.find();  // Ensure ProductModel is properly imported
      return res.json({
        message: "Category product list",
        data: products,
        error: false,
        success: true,
      });
    } catch (err) {
      console.error(err); // Log the error for better debugging
      res.status(500).json({
        message: 'Server error',
        error: true,
        success: false,
      });
    }
  };
  