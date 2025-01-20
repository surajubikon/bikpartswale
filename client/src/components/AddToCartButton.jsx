import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState()
    const navigate = useNavigate(); // Initialize useNavigate
    const [isSoldOut, setIsSoldOut] = useState(false); // Add a state to check if the product is sold out
    const [stock, setStock] = useState(0); // Track stock available

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId._id === data._id)
        setQty(product?.quantity)
        setCartItemsDetails(product)

        // Track the stock and set the sold-out condition
        setStock(data?.stock || 0); // Assuming `data.stock` contains the stock count
        setIsSoldOut(data?.stock === 0); // If stock is 0, mark the product as sold out
    }, [data, cartItem])

    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Prevent increasing quantity if stock limit is reached
        if (qty >= stock) {
            toast.error("Cannot add more. Product limit reached.");
            return;
        }

        const response = await updateCartItem(cartItemDetails?._id, qty + 1)

        if (response.success) {
            toast.success("Item added")
        }
    }

    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {
            const response = await updateCartItem(cartItemDetails?._id, qty - 1)

            if (response.success) {
                toast.success("Item removed")
            }
        }
    }

    const handleBuyNow = () => {
        if (isSoldOut) {
            toast.error("This product is sold out");
        } else if (qty > stock) {
            toast.error("You cannot buy more than the available stock.");
        } else {
            navigate('/checkout'); // Redirect to /checkout page
        }
    };

    return (
        <div className='w-full max-w-[150px] flex flex-col gap-2'>
            {
                isSoldOut ? (
                    <button className='bg-gray-500 text-white px-2 lg:px-4 py-1 w-full rounded' disabled>
                        Sold Out
                    </button>
                ) : (
                    isAvailableCart ? (
                        <div className='flex w-full h-full gap-1'>
                            <button onClick={decreaseQty} className='bg-red-600 hover:bg-red-700 text-white flex-1 w-full p-2 rounded flex items-center justify-center'>
                                <FaMinus />
                            </button>

                            <p className='flex-1 w-full font-semibold px-2 flex items-center justify-center'>
                                {qty}
                            </p>

                            <button onClick={increaseQty} className='bg-red-600 hover:bg-red-700 text-white flex-1 w-full p-2 rounded flex items-center justify-center'>
                                <FaPlus />
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleADDTocart} className='bg-red-600 hover:bg-gray-700 text-white px-2 lg:px-4 py-1 w-full rounded'>
                            {loading ? <Loading /> : "Add"}
                          
                        </button>
                         )
                )
            }

            <button onClick={handleBuyNow} className={`w-full rounded ${isSoldOut ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-gray-700'} text-white px-2 lg:px-4 py-1`}>
                {isSoldOut ? "Sold Out" : "Buy Now"}
            </button>
        </div>
    )
}

export default AddToCartButton
