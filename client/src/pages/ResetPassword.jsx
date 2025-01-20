import React, { useEffect, useState } from 'react';  
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';  
import { Link, useLocation, useNavigate } from 'react-router-dom';  
import SummaryApi from '../common/SummaryApi';  
import toast from 'react-hot-toast';  
import AxiosToastError from '../utils/AxiosToastError';  
import Axios from '../utils/Axios';  

const ResetPassword = () => {  
    const location = useLocation();  
    const navigate = useNavigate();  
    const [data, setData] = useState({  
        email: "",  
        newPassword: "",  
        confirmPassword: ""  
    });  
    const [showPassword, setShowPassword] = useState(false);  
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  

    const valideValue = Object.values(data).every(el => el);  

    useEffect(() => {  
        if (!(location?.state?.data?.success)) {  
            navigate("/");  
        }  

        if (location?.state?.email) {  
            setData((prev) => ({  
                ...prev,  
                email: location?.state?.email  
            }));  
        }  
    }, [location, navigate]);  

    const handleChange = (e) => {  
        const { name, value } = e.target;  

        setData((prev) => ({  
            ...prev,  
            [name]: value  
        }));  
    };  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        if (data.newPassword !== data.confirmPassword) {  
            toast.error("New password and confirm password must be the same.");  
            return;  
        }  

        try {  
            const response = await Axios({  
                ...SummaryApi.resetPassword,  
                data: data  
            });  

            if (response.data.error) {  
                toast.error(response.data.message);  
            }  

            if (response.data.success) {  
                toast.success(response.data.message);  
                navigate("/login");  
                setData({  
                    email: "",  
                    newPassword: "",  
                    confirmPassword: ""  
                });  
            }  

        } catch (error) {  
            AxiosToastError(error);  
        }  
    };  

    return (  
        <section className='w-full flex items-center justify-center min-h-screen bg-gray-100'>  
            <div className='bg-white w-full max-w-lg mx-auto rounded-lg p-6 shadow-md'>  
                <p className='font-semibold text-lg text-center'>Enter Your Password</p>  
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>  
                    <div className='grid gap-1'>  
                        <label htmlFor='newPassword' className='text-sm font-medium'>New Password:</label>  
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>  
                            <input  
                                type={showPassword ? "text" : "password"}  
                                id='newPassword'  
                                className='w-full outline-none'  
                                name='newPassword'  
                                value={data.newPassword}  
                                onChange={handleChange}  
                                placeholder='Enter your new password'  
                                required  
                            />  
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>  
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}  
                            </div>  
                        </div>  
                    </div>  

                    <div className='grid gap-1'>  
                        <label htmlFor='confirmPassword' className='text-sm font-medium'>Confirm Password:</label>  
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>  
                            <input  
                                type={showConfirmPassword ? "text" : "password"}  
                                id='confirmPassword'  
                                className='w-full outline-none'  
                                name='confirmPassword'  
                                value={data.confirmPassword}  
                                onChange={handleChange}  
                                placeholder='Confirm your password'  
                                required  
                            />  
                            <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>  
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}  
                            </div>  
                        </div>  
                    </div>  

                    <button   
                        disabled={!valideValue}   
                        className={`w-full text-white py-2 rounded font-semibold my-3 tracking-wide ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"}`}  
                    >  
                        Change Password  
                    </button>  
                </form>  

                <p className='text-center'>  
                    Already have an account?   
                    <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'> Login</Link>  
                </p>  
            </div>  
        </section>  
    );  
};  

export default ResetPassword;