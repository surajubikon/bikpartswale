import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [brandData, setBrandData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const allSubBrands = useSelector(state => state.product.allSubBrands)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])
  const [DisplaySubBrand, setDisplaySubBrand] = useState([])


  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const brandId = params.category.split("-").slice(-1)[0]
  const subBrandId = params.subCategory.split("-").slice(-1)[0]
  
  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBrandProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        url: SummaryApi.getProductByBrandAndSubBrand.url,
        method: SummaryApi.getProductByBrandAndSubBrand.method,
        data: {
          brandId: brandId,
          subBrandId: subBrandId,
          page: page,
          limit: 8,
        }
      });
      
      const { data: responseData } = response;  // Access response data here
  
      if (responseData.success) {
        if (responseData.page === 1) {
          setBrandData(responseData.data); // Set initial data
        } else {
          setBrandData([...brandData, ...responseData.data]); // Append new data to existing
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProductdata()
     fetchBrandProductdata()
  }, [params])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])
  
  useEffect(() => {
      const brand = allSubBrands.filter(s => {
        const filterData = s.brand.some(el => {
          return el._id == brandId
        })
  
        return filterData ? filterData : null
      })
      setDisplaySubBrand(brand)
    }, [params, allSubBrands])

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24  mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
  {/** Sub Category **/}
  <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
    {
      DisplaySubCatory.map((s, index) => {
        const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
        return (
          <Link to={link} 
            className={`w-full p-2 flex flex-col items-center lg:flex-row lg:w-full lg:h-16 box-border lg:gap-4 border-b 
              hover:bg-green-100 cursor-pointer
              ${subCategoryId === s._id ? "bg-green-100" : ""}
            `}
          >
            <div className='w-14 lg:w-12 h-14 lg:h-16 bg-white rounded box-border flex-shrink-0'>
              <img
                src={s.image}
                alt='subCategory'
                className='object-contain w-full h-full'
              />
            </div>
            <p className='mt-2 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
          </Link>
        );
      })
    }

    {
      DisplaySubBrand.map((s, index) => {
        const link = `/${valideURLConvert(s?.brand[0]?.name)}-${s?.brand[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
        return (
          <Link to={link} 
            className={`w-full p-2 flex flex-col items-center lg:flex-row lg:w-full lg:h-16 box-border lg:gap-4 border-b 
              hover:bg-green-100 cursor-pointer
              ${subBrandId === s._id ? "bg-green-100" : ""}
            `}
          >
            <div className='w-14 lg:w-12 h-14 lg:h-16 bg-white rounded box-border flex-shrink-0'>
              <img
                src={s.image}
                alt='subBrand'
                className='object-contain w-full h-full'
              />
            </div>
            <p className='mt-2 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
          </Link>
        );
      })
    }
  </div>

  {/** Product Section **/}
  <div className='sticky top-20'>
    <div className='bg-white shadow-md p-4 z-10'>
      <h3 className='font-semibold'>{subCategoryName}</h3>
    </div>
    <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
        {
          data.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + "productSubCategory" + index}
            />
          ))
        }
        {
          brandData.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + "productSubCategory" + index}
            />
          ))
        }
      </div>
    </div>

    {loading && <Loading />}
  </div>
</div>

    </section>
  )
}

export default ProductListPage
