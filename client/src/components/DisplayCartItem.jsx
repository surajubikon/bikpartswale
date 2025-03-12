import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.webp'
import toast from 'react-hot-toast'

const DisplayCartItem = ({close}) => {
    const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
    const cartItem  = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = ()=>{
        if(user?._id){
            navigate("/checkout")
            if(close){
                close()
            }
            return
        }
        toast("Please Login")
    }
  return (
    <section className="bg-neutral-900 fixed inset-0 bg-opacity-70 z-50 flex justify-end">
    <div className="bg-white w-full sm:max-w-sm min-h-screen max-h-screen ml-auto">
      {/* Header */}
      <div className="flex items-center p-4 shadow-md gap-3 justify-between">
        <h2 className="font-semibold">Cart</h2>
        <Link to={"/"} className="sm:hidden">
          <IoClose size={25} />
        </Link>
        <button onClick={close} className="hidden sm:block">
          <IoClose size={25} />
        </button>
      </div>
  
      {/* Cart Content */}
      <div className="min-h-[75vh] sm:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4 overflow-auto">
        {cartItem[0] ? (
          <>
            <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full text-sm">
              <p>Your total savings</p>
              <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
            </div>
  
            <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
              {cartItem.map((item, index) => (
                <div key={item?._id + "cartItemDisplay"} className="flex w-full gap-4">
                  <div className="w-16 h-16 bg-red-500 border rounded flex items-center justify-center">
                    <img src={item?.productId?.image[0]} className="object-scale-down w-full h-full" />
                  </div>
                  <div className="w-full max-w-sm text-xs">
                    <p className="text-xs text-ellipsis line-clamp-2">{item?.productId?.name}</p>
                    <p className="text-neutral-400">{item?.productId?.unit}</p>
                    <p className="font-semibold">
                      {DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}
                    </p>
                  </div>
                  <div>
                    <AddToCartButton data={item?.productId} />
                  </div>
                </div>
              ))}
            </div>
  
            {/* Bill Details */}
            <div className="bg-white p-4 text-sm">
              <h3 className="font-semibold">Bill details</h3>
              <div className="flex justify-between py-1">
                <p>Items total</p>
                <p className="flex items-center gap-2">
                  <span className="line-through text-neutral-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                  <span>{DisplayPriceInRupees(totalPrice)}</span>
                </p>
              </div>
              <div className="flex justify-between py-1">
                <p>Quantity total</p>
                <p>{totalQty} item</p>
              </div>
              <div className="flex justify-between py-1">
                <p>Delivery Charge</p>
                <p>Free</p>
              </div>
              <div className="font-semibold flex justify-between py-2 text-base">
                <p>Grand total</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white flex flex-col justify-center items-center p-4">
            <img src={imageEmpty} className="w-3/4 h-3/4 object-scale-down" />
            <Link onClick={close} to={"/"} className="block bg-red-600 px-4 py-2 text-white rounded mt-4 text-center">
              Shop Now
            </Link>
          </div>
        )}
      </div>
  
      {/* Checkout Button */}
      {cartItem[0] && (
        <div className="p-2">
          <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 rounded flex items-center justify-between">
            <div>{DisplayPriceInRupees(totalPrice)}</div>
            <button onClick={redirectToCheckoutPage} className="flex items-center gap-1">
              Proceed <FaCaretRight />
            </button>
          </div>
        </div>
      )}
    </div>
  </section>
  
  )
}

export default DisplayCartItem
