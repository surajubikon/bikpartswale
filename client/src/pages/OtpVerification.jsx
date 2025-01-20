import React, { useEffect, useRef, useState } from 'react';  
import toast from 'react-hot-toast';  
import Axios from '../utils/Axios';  
import SummaryApi from '../common/SummaryApi';  
import AxiosToastError from '../utils/AxiosToastError';  
import { Link, useLocation, useNavigate } from 'react-router-dom';  

const OtpVerification = () => {  
    const [data, setData] = useState(["", "", "", "", "", ""]);  
    const navigate = useNavigate();  
    const inputRef = useRef([]);  
    const location = useLocation();  

    useEffect(() => {  
        if (!location?.state?.email) {  
            navigate("/forgot-password");  
        }  
    }, [location, navigate]);  

    const valideValue = data.every(el => el);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  

        try {  
            const response = await Axios({  
                ...SummaryApi.forgot_password_otp_verification,  
                data: {  
                    otp: data.join(""),  
                    email: location?.state?.email  
                }  
            });  

            if (response.data.error) {  
                toast.error(response.data.message);  
            }  

            if (response.data.success) {  
                toast.success(response.data.message);  
                setData(["", "", "", "", "", ""]);  
                navigate("/reset-password", {  
                    state: {  
                        data: response.data,  
                        email: location?.state?.email  
                    }  
                });  
            }  

        } catch (error) {  
            AxiosToastError(error);  
        }  
    };  

    return (  
        <section className='w-full flex items-center justify-center min-h-screen bg-gray-100'>  
            <div className='bg-white w-full max-w-lg mx-auto rounded-lg p-6 shadow-md'>  
                <p className='font-semibold text-lg text-center'>Enter OTP</p>  
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>  
                    <div className='grid gap-1'>  
                        <label htmlFor='otp' className='text-sm font-medium'>Enter Your OTP:</label>  
                        <div className='flex items-center gap-2 justify-between mt-3'>  
                            {  
                                data.map((element, index) => (  
                                    <input  
                                        key={"otp" + index}  
                                        type='text'  
                                        id='otp'  
                                        ref={(ref) => {  
                                            inputRef.current[index] = ref;  
                                            return ref;  
                                        }}  
                                        value={data[index]}  
                                        onChange={(e) => {  
                                            const value = e.target.value;  

                                            const newData = [...data];  
                                            newData[index] = value;  
                                            setData(newData);  

                                            if (value && index < 5) {  
                                                inputRef.current[index + 1].focus();  
                                            }  
                                        }}  
                                        maxLength={1}  
                                        className='bg-blue-50 w-full max-w-[60px] p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold'  
                                    />  
                                ))  
                            }  
                        </div>  
                    </div>  

                    <button   
                        disabled={!valideValue}   
                        className={`w-full text-white py-2 rounded font-semibold my-3 tracking-wide ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"}`}  
                    >  
                        Verify OTP  
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

export default OtpVerification;