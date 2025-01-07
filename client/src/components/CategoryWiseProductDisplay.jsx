import React, { useEffect, useRef, useState } from 'react'
import { Link, } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    

  

  const handleRedirectProductListpage = ()=>{
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`

      return url
  }

  const redirectURL =  handleRedirectProductListpage()
    return (
        <div className='container mx-auto px-4'>
        <div className='home-heading text-center relative'>
            <h2 className='font-semibold text-lg md:text-xl'>{name}</h2>
            <Link to={redirectURL} className='text-green-600 hover:text-green-400 absolute right-4 top-0'>See All</Link>
        </div>
        <div className='relative'>
            <div className='flex overflow-x-auto scroll-smooth scrollbar-none'>
                {loading && loadingCardNumber.map((_, index) => {
                    return (
                        <CardLoading key={"CategorywiseProductDisplay123" + index} />
                    )
                })}
    
                {data.map((p, index) => {
                    return (
                        <CardProduct
                            data={p}
                            key={p._id + "CategorywiseProductDisplay" + index}
                            className="flex-none min-w-[180px] mx-2" // Ensures a fixed card size
                        />
                    )
                })}
            </div>
            <div className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 container mx-auto px-2 hidden lg:flex justify-between'>
                <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                    <FaAngleLeft />
                </button>
                <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                    <FaAngleRight />
                </button>
            </div>
        </div>
    </div>
    

    )
}

export default CategoryWiseProductDisplay
