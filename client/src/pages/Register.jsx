import React, { useState } from 'react';  
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";  
import toast from 'react-hot-toast';  
import Axios from '../utils/Axios';  
import SummaryApi from '../common/SummaryApi';  
import AxiosToastError from '../utils/AxiosToastError';  
import { Link, useNavigate } from 'react-router-dom';  

const Register = () => {  
    const [data, setData] = useState({  
        name: "",  
        email: "",  
        password: "",  
        confirmPassword: ""  
    });  
    const [showPassword, setShowPassword] = useState(false);  
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility  
    const [otp, setOtp] = useState("");  
    const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP has been sent  
    const [resendCooldown, setResendCooldown] = useState(0); // Resend OTP cooldown  
    const navigate = useNavigate();  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setData((prev) => ({ ...prev, [name]: value }));  
    };  

    const validValue = Object.values(data).every((el) => el);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        if (data.password !== data.confirmPassword) {  
            toast.error("Password and confirm password must be the same");  
            return;  
        }  

        try {  
            const response = await Axios({  
                ...SummaryApi.register,  
                data: data  
            });  

            if (response.data.error) {  
                toast.error(response.data.message);  
            }  

            if (response.data.success) {  
                toast.success(response.data.message);  
                setIsModalOpen(true); // Show the OTP modal after successful registration  
                setIsOtpSent(false); // Reset OTP sent status  
            }  
        } catch (error) {  
            AxiosToastError(error);  
        }  
    };  

    // Function to handle OTP send request  
    const handleSendOtp = async () => {  
        try {  
            const response = await Axios({  
                ...SummaryApi.resendOtp, // Assuming you have an endpoint to send OTP  
                data: { email: data.email }  
            });  
            if (response.data.success) {  
                setIsOtpSent(true);  
                setResendCooldown(30); // Set cooldown for 30 seconds  
                toast.success("A new OTP has been sent to your email.");  
                // Decrease cooldown timer every second  
                const cooldownInterval = setInterval(() => {  
                    setResendCooldown((prev) => {  
                        if (prev <= 1) {  
                            clearInterval(cooldownInterval);  
                            return 0;  
                        }  
                        return prev - 1;  
                    });  
                }, 1000);  
            } else {  
                toast.error(response.data.message);  
            }  
        } catch (error) {  
            AxiosToastError(error);  
        }  
    };  

    // Function to handle OTP validation  
    const handleOtpSubmit = async () => {  
        try {  
            const response = await Axios({  
                ...SummaryApi.verifyOtp, // Assuming you have an endpoint to verify OTP  
                data: { email: data.email, otp: otp }  
            });  
            if (response.data.success) {  
                toast.success("OTP verified successfully!");  
                navigate("/login");  
                setIsModalOpen(false); // Close modal on success  
            } else {  
                toast.error(response.data.message);  
            }  
        } catch (error) {  
            AxiosToastError(error);  
        }  
    };  

    return (  
        <section className='w-full flex items-center justify-center min-h-screen bg-gray-100'>  
            <div className='bg-white w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto rounded-lg shadow-lg p-6 sm:p-8'>  
                <p className='font-semibold text-lg text-gray-800 text-center'>Welcome to BikeParts</p>  
                <form className='grid gap-6 mt-6' onSubmit={handleSubmit}>  
                    <div className='grid gap-2'>  
                        <label htmlFor='name' className='text-sm font-medium text-gray-700'>Name:</label>  
                        <input  
                            type='text'  
                            id='name'  
                        
                            className='bg-blue-50 p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'  
                            name='name'  
                            value={data.name}  
                            onChange={handleChange}  
                            placeholder='Enter your name'  
                        />  
                    </div>  
                    <div className='grid gap-2'>  
                        <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email:</label>  
                        <input  
                            type='email'  
                            id='email'  
                            className='bg-blue-50 p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'  
                            name='email'  
                            value={data.email}  
                            onChange={handleChange}  
                            placeholder='Enter your email'  
                        />  
                    </div>  
                    <div className='grid gap-2'>  
                        <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password:</label>  
                        <div className='bg-blue-50 p-3 border border-gray-300 rounded-md flex items-center focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200'>  
                            <input  
                                type={showPassword ? "text" : "password"}  
                                id='password'  
                                className='w-full outline-none'  
                                name='password'  
                                value={data.password}  
                                onChange={handleChange}  
                                placeholder='Enter your password'  
                            />  
                            <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer text-gray-600'>  
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}  
                            </div>  
                        </div>  
                    </div>  
                    <div className='grid gap-2'>  
                        <label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700'>Confirm Password:</label>  
                        <div className='bg-blue-50 p-3 border border-gray-300 rounded-md flex items-center focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200'>  
                            <input  
                                type={showConfirmPassword ? "text" : "password"}  
                                id='confirmPassword'  
                                className='w-full outline-none'  
                                name='confirmPassword'  
                                value={data.confirmPassword}  
                                onChange={handleChange}  
                                placeholder='Confirm your password'  
                            />  
                            <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer text-gray-600'>  
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}  
                            </div>  
                        </div>  
                    </div>  

                    <button  
                        disabled={!validValue}  
                        className={`w-full py-3 rounded-md font-semibold tracking-wide text-white transition ${validValue ? "bg-red-500 hover:bg-red-700 focus:ring focus:ring-red-200" : "bg-gray-400 cursor-not-allowed"}`}  
                    >  
                        Register  
                    </button>  
                </form>  

                <p className='mt-4 text-center text-sm text-gray-600'>  
                    Already have an account?{' '}  
                    <Link to={'/login'} className='font-medium text-red-500 hover:text-red-700 transition'>  
                        Login  
                    </Link>  
                </p>  
            </div>  

            {/* OTP Modal */}  
            {isModalOpen && (  
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">  
                    <div className="bg-white p-6 rounded-lg relative w-full max-w-md">  
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-xl">&times;</button>  
                        <h2 className="text-lg font-semibold text-center mb-4">Verify Your Email</h2>  
                        <p className="mb-4 text-sm text-gray-600">We have sent an OTP to your email. Please enter the OTP below to complete the registration.</p>  
                        <input  
                            type="text"  
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"  
                            placeholder="Enter OTP"  
                            value={otp}  
                            onChange={(e) => setOtp(e.target.value)}  
                        />  
                        <div className="flex justify-between">  
                            <button  
                                onClick={handleSendOtp}  
                                disabled={resendCooldown > 0}  
                                className={`px-4 py-2 rounded-md font-medium transition ${resendCooldown > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}  
                            >  
                                {resendCooldown > 0 ? `Wait ${resendCooldown}s` : "Resend OTP"}  
                            </button>  
                            <button  
                                onClick={handleOtpSubmit}  
                                className="px-4 py-2 bg-green-500 hover:bg-red-600 text-white rounded-md font-medium transition"  
                            >  
                                Submit  
                            </button>  
                        </div>  
                    </div>  
                </div>  
            )}  
        </section>  
    );  
};  

export default Register;