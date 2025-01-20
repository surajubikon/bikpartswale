import React, { useState } from 'react';  
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";  
import toast from 'react-hot-toast';  
import Axios from '../utils/Axios';  
import SummaryApi from '../common/SummaryApi';  
import AxiosToastError from '../utils/AxiosToastError';  
import { Link, useNavigate } from 'react-router-dom';  
import fetchUserDetails from '../utils/fetchUserDetails';  
import { useDispatch } from 'react-redux';  
import { setUserDetails } from '../store/userSlice';  

const Login = () => {  
    const [data, setData] = useState({  
        email: "",  
        password: "",  
    });  
    const [showPassword, setShowPassword] = useState(false);  
    const navigate = useNavigate();  
    const dispatch = useDispatch();  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setData((prev) => ({  
            ...prev,  
            [name]: value  
        }));  
    };  

    const valideValue = Object.values(data).every(el => el);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        try {  
            const response = await Axios({  
                ...SummaryApi.login,  
                data: data  
            });  

            if (response.data.error) {  
                toast.error(response.data.message);  
            }  

            if (response.data.success) {  
                toast.success(response.data.message);  
                localStorage.setItem('accesstoken', response.data.data.accesstoken);  
                localStorage.setItem('refreshToken', response.data.data.refreshToken);  

                const userDetails = await fetchUserDetails();  
                dispatch(setUserDetails(userDetails.data));  

                setData({  
                    email: "",  
                    password: "",  
                });  
                navigate("/");  
            }  

        } catch (error) {  
            AxiosToastError(error);  
        }  
    };  

    return (  
        <section className="w-full flex items-center justify-center h-screen bg-gray-100">  
            <div className="bg-white w-full max-w-md mx-auto rounded-lg p-6 shadow-md sm:p-8">  
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>  
                    <div className="grid gap-2">  
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">  
                            Email:  
                        </label>  
                        <input  
                            type="email"  
                            id="email"  
                            className="bg-blue-50 p-2 border rounded-md outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-200"  
                            name="email"  
                            value={data.email}  
                            onChange={handleChange}  
                            placeholder="Enter your email"  
                        />  
                    </div>  
                    <div className="grid gap-2">  
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">  
                            Password:  
                        </label>  
                        <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:ring-2 focus-within:ring-primary-200">  
                            <input  
                                type={showPassword ? "text" : "password"}  
                                id="password"  
                                className="w-full outline-none bg-transparent"  
                                name="password"  
                                value={data.password}  
                                onChange={handleChange}  
                                placeholder="Enter your password"  
                            />  
                            <button  
                                type="button"  
                                onClick={() => setShowPassword((prev) => !prev)}  
                                className="ml-2 text-gray-500 hover:text-gray-700"  
                            >  
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}  
                            </button>  
                        </div>  
                        <Link  
                            to="/forgot-password"  
                            className="block ml-auto text-sm text-primary-500 hover:text-primary-700"  
                        >  
                            Forgot password?  
                        </Link>  
                    </div>  

                    <button  
                        disabled={!valideValue}  
                        className={`w-full text-white py-2 rounded-md font-semibold my-3 tracking-wide ${  
                            valideValue ? "bg-red-800 hover:bg-red-700" : "bg-gray-500 cursor-not-allowed"  
                        }`}  
                    >  
                        Login  
                    </button>  
                </form>  

                <p className="text-center text-sm">  
                    Don't have an account?{" "}  
                    <Link  
                        to="/register"  
                        className="font-semibold text-red-500 hover:text-red-800"  
                    >  
                        Register  
                    </Link>  
                </p>  
            </div>  
        </section>  
    );  
};  

export default Login;