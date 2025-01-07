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
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p>Welcome to BikeParts</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name :</label>
                        <input
                            type='text'
                            id='name'
                            autoFocus
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>Email :</label>
                        <input
                            type='email'
                            id='email'
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full outline-none'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword((prev) => !prev)} className='cursor-pointer'>
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                className='w-full outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your confirm password'
                            />
                            <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='cursor-pointer'>
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    <button disabled={!validValue} className={`${validValue ? "bg-red-500 hover:bg-red-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}>Register</button>
                </form>

                <p>Already have an account? <Link to={"/login"} className='font-semibold text-red-500 hover:text-red-800'>Login</Link></p>
            </div>

            {/* OTP Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded relative w-96">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-xl">&times;</button>
                        <h2 className="text-center mb-4">Verify Your Email</h2>
                        <p className="mb-4">We have sent an OTP to your email. Please enter the OTP below to complete the registration.</p>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={handleSendOtp}
                                disabled={resendCooldown > 0}
                                className={`${
                                    resendCooldown > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                                } text-white py-2 px-4 rounded`}
                            >
                                {resendCooldown > 0 ? `Wait ${resendCooldown}s` : "Resend OTP"}
                            </button>
                            <button onClick={handleOtpSubmit} className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Register;
