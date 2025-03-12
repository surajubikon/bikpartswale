import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import banner from "../assets/b.jpg";
import bannerMobile from "../assets/bannermob.jpg";
import pb1 from "../assets/pb1.png";
import pb2 from "../assets/pb2.png";
import pb3 from "../assets/pb3.png";
import pb4 from "../assets/pb4.png";
import pb5 from "../assets/pb5.png";
import pb6 from "../assets/pb6.png";

import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import BrandWiseProductDisplay from "../components/BrandWiseProductDisplay";
import { valideURLConvert } from "../utils/valideURLConvert";

// import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';  // If using Navigation module
import 'swiper/css/pagination';  // If using Pagination module


// import '../assets/css/style.css';


const Home = () => {
  const [bannerData, setBannerData] = useState(null);
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const brandData = useSelector((state) => state.product.allBrands);

  const subBrandData = useSelector((state) => state.product.allSubBrands);
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [newDeal, setNewDeal] = useState([]);
  const [newOfferline, setNewOfferLine] = useState([]);

  useEffect(() => {

    const fetchBrands = async () => {

      try {
        const response = await axios.get(
          "http://localhost:5173/api/brand-models/get"
        );
        // const response = await axios.get(
        //   "http://localhost:5173/api/brand-models/get"
        // );

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
          "http://localhost:5173/api/product/top-selling-products"

        );

        setTopSellingProducts(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching top-selling products:", err);
        setError("Failed to load top-selling products");
      }
    };
    const fetchNewdeal = async () => {

      try {
        const response = await axios.get(
          "http://localhost:5173/api/product/new-deals"

        );

        setNewDeal(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching top-selling products:", err);
        setError("Failed to load top-selling products");
      }
    };
    const fetchOfferline = async () => {

      try {
        const response = await axios.get(
          "http://localhost:5173/api/product/new-line"

        );

        setNewOfferLine(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching offer line:", err);
        setError("Failed to load offerline ");
      }
    };
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5173/api/banner/get-banner');

        setBannerData(response); // Assuming the API returns the banner data directly
      } catch (err) {
        console.error("Error fetching banner:", err);
        setError("Failed to load banner");
      }
    };



    fetchBanner();
    fetchBrands();
    fetchNewdeal();
    fetchOfferline();
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

  const handleRedirectProductBrandListPage = (brandId, brandName) => {

    const subbrand = subBrandData.find((sub) =>
      Array.isArray(sub.brand) && sub.brand.some((b) => b._id === brandId)
    );
    if (!subbrand || !subbrand.name) {
      console.error("subbrand not found or invalid data.");
      return;
    }

    // Generate the valid URL
    const url = `/${valideURLConvert(brandName)}-${brandId}/${valideURLConvert(
      subbrand.name
    )}-${subbrand._id}`;

    // Redirect to the generated URL
    navigate(url);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto">


        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${!bannerData && "animate-pulse my-2"}`}
        >
          {bannerData ? (
            <>

              <img
                src={bannerData.data?.data[0]?.image} // Use the 'image' property from the response

                className="w-full h-full hidden lg:block"
                alt="banner"
              />
              {/* You can add another image tag for mobile version if you want, but using the same image */}
              <img
                src={bannerData.data?.data[0]?.image} // Assuming mobile and desktop images are the same
                className="w-full h-full lg:hidden"
                alt="banner"
              />
            </>
          ) : (
            <div className="w-full h-full bg-gray-200"></div> // Placeholder while loading
          )}
        </div>
      </div>



      {/** update brands */}
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
              slidesPerView: 4, // For tabletsma
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
        />

        <div className="container mx-auto px-6 my-8" />
        <div className="home-heading">
          <div className="flex justify-center my-8">
            <h2 className="text-2xl font-bold text-red-600 uppercase tracking-wide border-2 border-red-500 px-6 py-2 rounded-md shadow-lg">
              Brands
            </h2>
          </div>

        </div>

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
            {brandData.map((brand) => (

              <SwiperSlide key={brand._id}>
                <div
                  onClick={() => handleRedirectProductBrandListPage(brand._id, brand.name)} // Add this line
                  className="rounded-lg p-2 shadow hover:shadow-lg transition brands-product cursor-pointer"
                >
                  <img
                    src={brand.image}

                    className="w-full h-32 object-cover rounded-md"
                  />

                </div>
              </SwiperSlide>

            ))}
          </Swiper>
        )}

      </div>

      <div className="container mx-auto px-6 my-4">
        <div className="home-heading text-center relative">
          <h2 className="text-2xl font-bold">Top New Deals</h2>
          <div className="container mx-auto px-6 my-4">
            {loading ? (
              <p>Loading Offer...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <>
                <div className="relative overflow-hidden bg-red-600 rounded-lg p-4 shadow-md">

                  <div className="absolute inset-0 flex items-center">
                    <marquee className="text-white text-lg font-semibold">
                      {newOfferline?.map((product, index) => (
                        <span key={index} className="mx-4">
                          {product.name}
                        </span>
                      ))}
                    </marquee>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                  {newOfferline?.map((product, index) => (
                    <div>
                    </div>))}
                </div>
              </>
            )}
          </div>

        </div>

        {loading ? (
          <p>Loading top new deals products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {newDeal?.map((product, index) => {


                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between h-full"
                  >
                    <img
                      src={product?.product?.image[0] || ""}
                      alt={product.name || "Product Image"}
                      className="w-full h-32 object-cover rounded-md mb-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-sm font-semibold text-gray-800">{product?.product?.name}</h3>
                    </div>
                    <div>

                      <p className="text-lg font-bold text-green-600">{product?.product?.price}₹</p>
                      <Link
                        to={`/product/${product?.product._id}`}

                        className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-6 my-4">
        <div className="home-heading text-center relative">
          <h2 className="inline-block border-4 border-red-500 px-6 py-2 rounded-lg text-2xl font-bold">
            Top Selling Products
          </h2>
        </div>

        {loading ? (
          <p>Loading top-selling products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topSellingProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col justify-between h-full">
                <img
                  src={product.image[0]}
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
      <div className="container mx-auto px-4 brake-clutch">
        <div className="home-heading text-center">
          <h2 className="inline-block border-4 border-red-500 px-6 py-2 rounded-lg text-2xl font-bold uppercase">
            Parts & Spare
          </h2>
          <p className="mt-2 text-gray-600">Five star rated latest best selling products</p>
        </div>

        {/* For small and medium screens (Swiper slider) */}
        <div className="">

          {/* Grid layout for different screen sizes */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {loadingCategory ? (
              new Array(12).fill(null).map((_, index) => (
                <div key={`loadingcategory-${index}`} className="bg-white rounded-lg p-4 min-h-36 grid gap-2 shadow-lg animate-pulse">
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              ))
            ) : (
              categoryData.map((cat) => (
                <div
                  key={`displayCategory-${cat._id}`}
                  className="w-full flex flex-col hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div onClick={() => handleRedirectProductListpage(cat._id, cat.name)} className="brake-clutch-iteam bg-gray-100 rounded-lg shadow-md p-3 flex flex-col justify-between min-h-[300px]">
                    <div className="flex flex-col h-full">
                      <div className="p-3 bg-white flex-grow">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-auto object-cover rounded"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-center mt-3">{cat.name}</h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 my-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Offer Box */}
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Left Content */}
            <div className="sm:col-span-2">
              <h2 className="font-semibold text-xs sm:text-sm">BIG SALE COUNTDOWN</h2>
              <h3 className="text-2xl sm:text-4xl font-bold my-2">Hurry Up!</h3>
              <p className="text-xs sm:text-sm mb-4 pr-0 sm:pr-12">
                Don't miss out on amazing deals. Grab your favorites before time runs out!
              </p>
            </div>
            {/* Right Discount Content */}
            <div className="text-center">
              <span className="text-5xl sm:text-7xl font-extrabold">75%</span>
              <p className="text-2xl sm:text-3xl mt-1">Off</p>
              
            </div>
          </div>
        </div>

        {/* Right Offer Box */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
          <div className="text-center md:text-left">
            <h2 className="font-semibold text-xs sm:text-sm">Mega Motorcycle Parts Offer</h2>
            <h3 className="text-2xl sm:text-4xl font-bold my-3 sm:my-5">Discover New Arrivals</h3>
            <p className="text-xs sm:text-sm mb-4">1000+ Spare parts!</p>
            
          </div>
        </div>
      </div>



      <div className="container mx-auto px-4 my-4">
        <div className="w-full relative popular-brands">
          <div className="home-heading text-center">
            <h2 className="inline-block border-4 border-red-500 px-6 py-2 rounded-lg text-2xl font-bold">
              Our Popular Brands
            </h2>
            <p className="mt-2 text-gray-600">Trusted by Millions, Loved Worldwide</p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            breakpoints={{
              640: {
                slidesPerView: 2, // 2 slides per view on mobile
              },
              768: {
                slidesPerView: 3, // 3 slides per view on tablets
              },
              1024: {
                slidesPerView: 4, // 4 slides per view on medium screens
              },
              1280: {
                slidesPerView: 6, // 6 slides per view on larger screens
              },
            }}
            className="h-full"
          >
            <SwiperSlide className="flex items-center justify-center text-white p-3 popular-brands-cell">
              <div>
                <img src={pb1} className="rounded-full" alt="Brand 1" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-white p-3 popular-brands-cell">
              <div>
                <img src={pb2} className="rounded-full" alt="Brand 2" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-white p-3 popular-brands-cell">
              <div>
                <img src={pb3} className="rounded-full" alt="Brand 3" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-white p-3 popular-brands-cell">
              <div>
                <img src={pb4} className="rounded-full" alt="Brand 4" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-white p-3 popular-brands-cell">
              <div>
                <img src={pb5} className="rounded-full" alt="Brand 5" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-white p-3 popular-brands-cell">
              <div>
                <img src={pb6} className="rounded-full" alt="Brand 6" />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10">
            Prev
          </button>
          <button className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10">
            Next
          </button>
        </div>
      </div>



      {categoryData?.map((c) => (
        <CategoryWiseProductDisplay
          key={c?._id + "CategorywiseProduct"}
          id={c?._id}
          name={c?.name}
        />
      ))}

      {/* {brands.map((b) => (
        <BrandWiseProductDisplay
          key={b?._id + "BrandwiseProduct"}
          id={b?._id}
          name={b?.name}
        />
      ))} */}
    </section>
  );
};

export default Home;
