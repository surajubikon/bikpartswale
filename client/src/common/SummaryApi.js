// export const baseURL = "http://localhost:5173/"

export const baseURL = "http://localhost:5173/"
const SummaryApi = {
    register: {
        url: '/api/user/register',
        method: 'post',
    },
    login: {
        url: '/api/user/login',
        method: 'post',
    },
    getAllProducts:{
        url:'/api/product/get-all-product',
        method:'get',
    },

    getNewDealsController: {
        url: '/api/product/new-deals', // Replace with your actual endpoint URL
        method: 'get',
    },
    getSingleNewDealController: {
        url: '/api/product/singledeal', // Replace with your actual endpoint URL
        method: 'get',
        },
        createnewdealController:{
            url:'/api/product/create/new-deals',
            method:'post',
        },
        updateNewDealController:{
            url:'/api/product/update',
            method:'put',
        },
        deleteNewDealController:{
            url:'/api/product/newdeal/delete',
            method:'delete',
        },
//tagline
getNewlineController:{
    url:'/api/product/new-line',
    method:'get',
},
createnewlineController:{
    url:'/api/product/create/new-line',
    method:'post',
},

updateNewlineController:{
    url:'/api/product/update-line/:id',
    method:'put',

},
deleteNewlineController:{
    url:'/api/product/new-line/delete/:id',
    method:'delete',
},

//banner 
CreateBannerController:{
    url:'/api/banner/create-banner',
    method:'post',
},
getBannerController:{
    url:'/api/banner/get-banner',
    method:'get',
},
updateBannerController:{
    url:'/api/banner/update-banner/:id',
    method:'put',
},
deleteBannerController:{
    url:'/api/banner/delete',
    method:'delete',
},
    verifyOtp: {
        url: '/api/user/verify-otp',
        method: 'post',
    },
    resendOtp: {
        url: '/api/user/resend-otp',
        method: 'post',
    },
    forgot_password: {
        url: '/api/user/forgot-password',
        method: 'put',
    },
    forgot_password_otp_verification: {
        url: 'api/user/verify-forgot-password-otp',
        method: 'put',
    },
    resetPassword: {
        url: '/api/user/reset-password',
        method: 'put',
    },
    refreshToken: {
        url: 'api/user/refresh-token',
        method: 'post',
    },
    userDetails: {
        url: '/api/user/user-details',
        method: 'get',
    },
    logout: {
        url: '/api/user/logout',
        method: 'get',
    },
    uploadAvatar: {
        url: '/api/user/upload-avatar',
        method: 'put',
    },
    updateUserDetails: {
        url: '/api/user/update-user',
        method: 'put',
    },
    addCategory: {
        url: '/api/category/add-category',
        method: 'post',
    },
    uploadImage: {
        url: '/api/file/upload',
        method: 'post',
    },
    getCategory: {
        url: '/api/category/get',
        method: 'get',
    },
    updateCategory: {
        url: '/api/category/update',
        method: 'put',
    },
    deleteCategory: {
        url: '/api/category/delete',
        method: 'delete',
    },
    createSubCategory: {
        url: '/api/subcategory/create',
        method: 'post',
    },
    getSubCategory: {
        url: '/api/subcategory/get',
        method: 'post',
    },
    updateSubCategory: {
        url: '/api/subcategory/update',
        method: 'put',
    },
    deleteSubCategory: {
        url: '/api/subcategory/delete',
        method: 'delete',
    },
    createProduct: {
        url: '/api/product/create',
        method: 'post',
    },
    getProduct: {
        url: '/api/product/get',
        method: 'post',
    },
    getProductByCategory: {
        url: '/api/product/get-product-by-category',
        method: 'post',
    },
    getProductByBrand: {
        url: '/api/product/get-product-by-brand',
        method: 'post',
    },
    getProductByCategoryAndSubCategory: {
        url: '/api/product/get-pruduct-by-category-and-subcategory',
        method: 'post',
    },
   getProductByBrandAndSubBrand: {
        url: '/api/product/get-pruduct-by-brand-and-subbrand',
        method: 'post',
    },
    getProductDetails: {
        url: '/api/product/get-product-details',
        method: 'post',
    },
    updateProductDetails: {
        url: '/api/product/update-product-details',
        method: 'put',
    },
    deleteProduct: {
        url: '/api/product/delete-product',
        method: 'delete',
    },
    searchProduct: {
        url: '/api/product/search-product',
        method: 'post',
    },
    addTocart: {
        url: '/api/cart/create',
        method: 'post',
    },
    getCartItem: {
        url: '/api/cart/get',
        method: 'get',
    },
    updateCartItemQty: {
        url: '/api/cart/update-qty',
        method: 'put',
    },
    deleteCartItem: {
        url: '/api/cart/delete-cart-item',
        method: 'delete',
    },
    createAddress: {
        url: '/api/address/create',
        method: 'post',
    },
    getAddress: {
        url: '/api/address/get',
        method: 'get',
    },
    updateAddress: {
        url: '/api/address/update',
        method: 'put',
    },
    disableAddress: {
        url: '/api/address/disable',
        method: 'delete',
    },
    CashOnDeliveryOrder: {
        url: '/api/order/cash-on-delivery',
        method: 'post',
    },
    payment_url: {
        url: '/api/order/verify-payment',
        method: 'post',
    },
    createOrder: {
        url :'api/order/create-order',
        method : 'post',
    },
    getOrderItems: {
        url: '/api/order/order-list',
        method: 'get',
    },
    // Brand Model Routes
    addBrands: {
        url: '/api/brand-models/add-brands',
        method: 'post',
    },
    AddBrandsmodelsController: {
        url: '/api/brand-models/add-brands',
        method: 'post',
    },
    updateBrandsmodelsController: {
        url: '/api/brand-models/update',
        method: 'put',
    },
    deleteBrandsmodelsController: {
        url: '/api/brand-models/delete',
        method: 'delete',
    },
    // Sub Brand Routes
    addSubBrandController : {
        url: '/api/sub-brand/add-subbrand',
        method: 'post',
    },
    getSubBrandsByCategoryController : {
        url: '/api/sub-brands/get',
        method: 'get',
    },
    updateSubBrandController : {
        url: '/api/sub-brand/update',
        method: 'put',
    },
    deleteSubBrandController : {
        url: '/api/sub-brand/delete',
        method: 'delete',
    },
    getBrands: {
        url: '/api/brand-models/get',
        method: 'get',
    },
    updateBrands: {
        url: '/api/brand-models/update',
        method: 'put',
    },
    deleteBrands: {
        url: '/api/brand-models/delete',
        method: 'delete',
    },

    // orderlist
    getOrdersByStatus: {
        url: '/api/admin/orders/status/:status',
        method: 'get',
    },
    getOrdersByUser: {
        url: '/api/admin/orders/user/:userId',
        method: 'get',
    },
    cancelOrder: {
        url: '/api/admin/orders/cancel/:id',
        method: 'delete',
    },
    getAllPendingOrders: {
        url: '/api/admin/orders/pending',
        method: 'get',
    },

}

export default SummaryApi;
