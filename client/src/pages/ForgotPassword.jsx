import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(data).every(el => el)


    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                  state : data
                })
                setData({
                    email : "",
                })
                
            }

        } catch (error) {
            AxiosToastError(error)
        }



    }

    return (
      <section className='w-full container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white my-6 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto rounded-lg shadow-lg p-6 sm:p-8'>
          <p className='font-semibold text-lg text-gray-800'>Forgot Password</p>
          <form className='grid gap-6 py-4' onSubmit={handleSubmit}>
            <div className='grid gap-2'>
              <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email:</label>
              <input
                type='email'
                id='email'
                className='bg-blue-50 p-3 border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition'
                name='email'
                value={data.email}
                onChange={handleChange}
                placeholder='Enter your email'
              />
            </div>
      
            <button
              disabled={!valideValue}
              className={`w-full py-3 rounded-md font-semibold tracking-wide text-white transition ${
                valideValue
                  ? "bg-red-600 hover:bg-red-700 focus:ring focus:ring-green-200"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Send OTP
            </button>
          </form>
      
          <p className='mt-4 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to={'/login'} className='font-medium text-red-500 hover:text-red-700 transition'>
              Login
            </Link>
          </p>
        </div>
      </section>
      
    )
}

export default ForgotPassword


