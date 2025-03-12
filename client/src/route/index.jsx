import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import BrandsPage from "../components/BrandsPage";
import SubBrandsPage from "../pages/SubBrandsPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import AboutUs from "../components/Aboutus";
import Contact from "../components/contact";
import Faq from "../components/faqs";
import Blog from "../components/blogs";  // Ensure 'Blog.js' exists in the components directory
import ReturnExchanges from "../components/ReturnExchanges";
import Newdeal from "../components/newDeal";
import Offer from "../components/Offer";
import Banner from "../components/bannerPage";
import FixScrollIssue from "../components/FixScrollIssue";


const router = createBrowserRouter([
    {
        path : "/",
        element : 
        (
            <>
            
                <FixScrollIssue/> {/* ✅ Ye scroll issue fix karega */}
                <App />
            </>
        ),
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            },
            {
                path : "/about-us",
                element : <AboutUs/>
                },
                {
                    path : "/blogs",
                    element : <Blog/>
                },
                { path : "/faqs",
                    element : <Faq/>
                 },
                 { 
                    path: "/contact",
                    element : <Contact/>
                    },
                    {
                        path : "/return-exchanges",
                        element : <ReturnExchanges/>
                    },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element : <OtpVerification/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "user",
                element : <UserMenuMobile/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myorders",
                        element : <MyOrders/>
                    },

                    
                     {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : 'category',
                        element : <AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path : 'Brands',
                        element : <AdminPermision><BrandsPage/></AdminPermision>
                    },
                    {
                        path : 'subbrand',
                        element : <AdminPermision><SubBrandsPage/></AdminPermision>
                    },
                    {
                        path : "subcategory",
                        element : <AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                
                    {
                        path : 'upload-product',
                        element : <AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path : 'product',
                        element : <AdminPermision><ProductAdmin/></AdminPermision>
                    },
                    {
                    path : 'newdeal',
                    element : <AdminPermision><Newdeal/></AdminPermision>
                },
                {
                    path : 'tagline',
                    element : <AdminPermision><Offer/></AdminPermision>
                },
                {
                    path : 'banner',
                    element : <AdminPermision><Banner/></AdminPermision>
                },
                
                ]
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : ":Brands",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            }
        ]
    }
])

export default router