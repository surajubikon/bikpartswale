import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import banner from "../assets/b.jpg";
import bannerMobile from "../assets/bannermob.jpg";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import { valideURLConvert } from "../utils/valideURLConvert";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';  // If using Navigation module
import 'swiper/css/pagination';  // If using Pagination module


const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/brand-models/get"
        );
        setBrands(response.data?.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError("Failed to load brands");
        setLoading(false);
      }
    };
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(
         "http://localhost:8080/api/product/top-selling-products"

        );
        setTopSellingProducts(response.data?.data || []);
      } catch (err) {
        console.log(response.data)
        console.error("Error fetching top-selling products:", err);
        setError("Failed to load top-selling products");
      }
    };

    fetchBrands();
    fetchTopSellingProducts();
  }, []);
  
  
  const handleRedirectProductListpage = (id, cat) => {
    // Find the related subcategory
    const subcategory = subCategoryData.find((sub) =>
      sub.category?.some((c) => c._id === id)
    );
  
    // Check if subcategory is found and has valid data
    if (!subcategory || !subcategory.name) {
      console.error("Subcategory not found or invalid data.");
      return;
    }
  
    // Generate the valid URL
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
  
    // Redirect to the generated URL
    navigate(url);
  };
  

  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          }`}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>




      {/* Brands Section */}
      <div className="container mx-auto px-6 my-4">
  <h2 className="text-2xl font-bold mb-4">Brands</h2>
  {loading ? (
    <p>Loading brands...</p>
  ) : error ? (
    <p className="text-red-600">{error}</p>
  ) : (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={2} // Default for mobile
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 2 }, // For small screens
        640: { slidesPerView: 3 }, // Medium screens
        768: { slidesPerView: 4 }, // Larger screens
        1024: { slidesPerView: 6 }, // Desktop screens
      }}
      className="relative"
    >
      {brands.map((brand) => (
        <SwiperSlide key={brand._id}>
          <div className="bg-white rounded-lg p-8 shadow hover:shadow-lg transition">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 object-cover rounded-md mb-8"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )}
</div>
<div className="container mx-auto px-6 my-4">
  <h2 className="text-2xl font-bold mb-4">Top Selling Products</h2>
  {loading ? (
    <p>Loading top-selling products...</p>
  ) : error ? (
    <p className="text-red-600">{error}</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {topSellingProducts.map((product) => (
        <div key={product._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover rounded-md mb-4"
          />
          <div className="flex-grow">
            <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600">{product.price}₹</p>
            <Link
              to={`/product/${product._id}`}
              className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


 {/** update catgrpry */}
 <div className="container mx-auto px-4 my-2">
      {/* For small and medium screens (Swiper slider) */}
      <Swiper
        spaceBetween={10} // Space between slides
        slidesPerView={2} // Default for mobile screens (2 slides visible)
        breakpoints={{
          640: {
            slidesPerView: 2, // For small screens (like mobile)
          },
          768: {
            slidesPerView: 4, // For tablets
          },
          1024: {
            slidesPerView: 6, // For medium screens
          },
          1280: {
            slidesPerView: 8, // For large screens
          },
        }}
        loop={true} // Enable infinite loop
        navigation // Show navigation arrows
        pagination={{ clickable: true }} // Enable clickable pagination
        className="mySwiper"
      >
        {loadingCategory ? (
          new Array(12).fill(null).map((_, index) => (
            <SwiperSlide
              key={`loadingcategory-${index}`}
              className="bg-white rounded-lg p-4 min-h-36 grid gap-2 shadow-lg animate-pulse"
            >
              <div className="bg-blue-100 min-h-24 rounded"></div>
              <div className="bg-blue-100 h-8 rounded"></div>
            </SwiperSlide>
          ))
        ) : (
          categoryData.map((cat) => (
            <SwiperSlide
              key={`displayCategory-${cat._id}`}
              className="w-full hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)} // Updated function call
                className="bg-gray-100 rounded-lg shadow-md p-1 flex flex-col justify-between"
              >
                <div className="relative">
                  <img
                    src={cat.image}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    alt={cat.name}
                  />
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>


      <div className="container mx-auto px-4 my-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">BIG SALE COUNTDOWN</h2>
          <h3 className="text-3xl font-bold my-2">Hurray Up!</h3>
          <p className="text-base mb-4">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
          <div className="text-center">
            <span className="text-7xl font-extrabold">75%</span>
            <p className="text-3xl mt-1">Off</p>
          </div>
          <Link
            to=""
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            View Details
          </Link>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Mega Motorcycle Parts Offer</h2>
          <h3 className="text-3xl font-bold my-2">Discover New Arrivals</h3>
          <p className="text-base mb-4">1000+ Spare parts!</p>
          <Link
            to=""
            className="mt-4 inline-block bg-white text-blue-600 py-2 px-4 rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay
          key={c?._id + "CategorywiseProduct"}
          id={c?._id}
          name={c?.name}
        />
      ))}
    </section>
  );
};

export default Home;
