import React, { useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import AddAddress from '../components/AddAddress';
import { useSelector } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RAZORPAY_KEY_ID = 'rzp_test_Ra46djE2vErkV7';

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Failed to load Razorpay SDK. Please try again.');
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: totalPrice * 100, // Razorpay requires the amount in paise
      currency: 'INR',
      name: 'E-commerce Checkout',
      description: 'Thank you for your purchase!',
      handler: async (response) => {
        try {
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            amount: totalPrice,
            addressId: addressList[selectAddress]?._id,
            list_items: cartItemsList,
          };

          const apiResponse = await Axios({
            ...SummaryApi.OnlinePaymentOrder,
            url: '/api/order/create-order',
            method: 'POST',
            data: paymentData,
          });

          if (apiResponse.data.success) {
            toast.success(apiResponse.data.message);
            if (fetchCartItem) fetchCartItem();
            if (fetchOrder) fetchOrder();
            navigate('/success', {
              state: { text: 'Order' },
            });
          }
        } catch (error) {
          AxiosToastError(error);
        }
      },
      prefill: {
        name: 'Guest User', // Replace with dynamic user data if available
        email: 'guest@example.com',
        contact: '0000000000',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        url: '/api/order/cash-on-delivery',
        method: 'POST',
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) fetchCartItem();
        if (fetchOrder) fetchOrder();
        navigate('/success', {
          state: { text: 'Order' },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='bg-blue-50'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        <div className='w-full'>
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {addressList.map((address, index) => (
              <label htmlFor={`address${index}`} key={index}>
                <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                  <div>
                    <input
                      id={`address${index}`}
                      type='radio'
                      value={index}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      name='address'
                    />
                  </div>
                  <div>
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}
            <div
              onClick={() => setOpenAddress(true)}
              className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'
            >
              Add address
            </div>
          </div>
        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill details</h3>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Items total</p>
              <p className='flex items-center gap-2'>
                <span className='line-through text-neutral-400'>
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Quantity total</p>
              <p className='flex items-center gap-2'>{totalQty} items</p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Delivery Charge</p>
              <p className='flex items-center gap-2'>Free</p>
            </div>
            <div className='font-semibold flex items-center justify-between gap-4'>
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <button
              className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>
            <button
              className='py-2 px-4 border-2 border-blue-600 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white'
              onClick={handleOnlinePayment}
            >
              Online Payment
            </button>
          </div>
        </div>
      </div>
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
