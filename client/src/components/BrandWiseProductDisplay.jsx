import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const BrandWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef();
    const subBrandData = useSelector(state => state.product.allSubBrands);
    const loadingCardNumber = new Array(6).fill(null);

    const fetchBrandWiseProduct = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProductByBrand,
                data: { id },
            });

            const { data: responseData } = response;

            if (responseData.success) {
                setData(responseData.data || []);
            } else {
                setData([]);
                console.error("API unsuccessful:", responseData.message);
            }
        } catch (error) {
            AxiosToastError(error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrandWiseProduct();
    }, [id]);

    const handleScrollRight = () => {
        const container = containerRef.current;
        container.scrollLeft = Math.min(container.scrollLeft + 200, container.scrollWidth - container.clientWidth);
    };

    const handleScrollLeft = () => {
        const container = containerRef.current;
        container.scrollLeft = Math.max(container.scrollLeft - 200, 0);
    };

    const handleRedirectProductBrandListPage = () => {
        const subBrand = subBrandData.find((sub) =>
            sub.brand.some((b) => b._id === id)
        );

        return subBrand
            ? `/${valideURLConvert(name)}-${id}/${valideURLConvert(subBrand.name)}-${subBrand._id}`
            : `/${valideURLConvert(name)}-${id}`;
    };

    const redirectURL = handleRedirectProductBrandListPage();

    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link>
            </div>
            <div className='relative flex items-center'>
                <div
                    className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth'
                    ref={containerRef}
                >
                    {loading &&
                        loadingCardNumber.map((_, index) => (
                            <CardLoading key={"BrandWiseProductDisplay123" + index} />
                        ))
                    }

                    {!loading && data.length === 0 && (
                        <p className="text-center text-gray-500">No products found.</p>
                    )}

                    {data.map((p, index) => (
                        <CardProduct
                            data={p}
                            key={p._id + "BrandWiseProductDisplay" + index}
                        />
                    ))}
                </div>
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button
                        aria-label="Scroll left"
                        onClick={handleScrollLeft}
                        className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        aria-label="Scroll right"
                        onClick={handleScrollRight}
                        className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full'
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrandWiseProductDisplay;
