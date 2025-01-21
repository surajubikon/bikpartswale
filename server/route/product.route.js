import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, 
    addRatingComment,
    getSingleNewDealController,
    getNewDealsController,
    createnewdealController,
    getRatingComments,
    deleteNewDealController,
    updateNewDealController,
    deleteRatingComment,
    getNewlineController, 
    createnewlineController,
    updateNewlineController,
    deleteNewlineController,
    getProductByBrand,
    getAllProducts,
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
productRouter.get('/get-all-product',getAllProducts)

//update product
productRouter.put('/update-product-details',auth,admin,updateProductDetails)

//delete product
productRouter.delete('/delete-product',auth,admin,deleteProductDetails)
productRouter.get('/top-selling-products', getTopSellingProducts);
// Rating and Comment routes
productRouter.post('/add-rating-comment', auth, addRatingComment); // Add a new rating/comment
productRouter.get('/get-rating-comments', getRatingComments); // Get ratings/comments for a product
productRouter.delete('/delete-rating-comment', auth, deleteRatingComment); // Optional: Delete a rating/comment

// New Deals routes
productRouter.get('/new-deals', getNewDealsController); // Get all deals
productRouter.get('/singledeal', getSingleNewDealController); // Get a single deal by ID
productRouter.post('/create/new-deals', auth, admin, createnewdealController); // Create a new deal
productRouter.put('/update/:id', auth, admin, updateNewDealController); // Update a deal by ID
productRouter.delete('/newdeal/delete/:id', auth, admin, deleteNewDealController); // Delete a deal by ID

//offerline
// New Deals routes
productRouter.get('/new-line', getNewlineController); // Get all deals
productRouter.post('/create/new-line', auth, admin, createnewlineController); // Create a new deal
productRouter.put('/update-line/:id', auth, admin, updateNewlineController); // Update a deal by ID
productRouter.delete('/new-line/delete/:id', auth, admin, deleteNewlineController); // Delete a deal by ID



//search product 
productRouter.post('/search-product',searchProduct)

export default productRouter