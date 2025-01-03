import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, 
    addRatingComment,
    getRatingComments,
    deleteRatingComment, 
    getProductByBrand,
    getProductByBrandAndSubBrand,
    deleteProductDetails,getTopSellingProducts, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

productRouter.post("/create",auth,admin,createProductController)
productRouter.post('/get',getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post('/get-product-by-brand', getProductByBrand);
productRouter.post('/get-pruduct-by-category-and-subcategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-pruduct-by-brand-and-subbrand',getProductByBrandAndSubBrand)
productRouter.post('/get-product-details',getProductDetails)

//update product
productRouter.put('/update-product-details',auth,admin,updateProductDetails)

//delete product
productRouter.delete('/delete-product',auth,admin,deleteProductDetails)
productRouter.get('/top-selling-products', getTopSellingProducts);
// Rating and Comment routes
productRouter.post('/add-rating-comment', auth, addRatingComment); // Add a new rating/comment
productRouter.get('/get-rating-comments', getRatingComments); // Get ratings/comments for a product
productRouter.delete('/delete-rating-comment', auth, deleteRatingComment); // Optional: Delete a rating/comment


//search product 
productRouter.post('/search-product',searchProduct)

export default productRouter