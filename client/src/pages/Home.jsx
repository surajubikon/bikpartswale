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


// import '../assets/css/style.css';


const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    fetchBrands();
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
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2"
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
      <div className="container mx-auto px-6 my-8 home-heading">
        <h2 className="text-2xl font-bold my-8 text-center text-red">Brands</h2>
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
                <div className="rounded-lg p-2 shadow hover:shadow-lg transition brands-product">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/** update catgrpry */}
      <div className="container mx-auto px-4 brake-clutch">
        <div className="home-heading text-center">
          <h2>Brake & Clutch</h2>
          <p>Five star rated latest best selling products</p>
        </div>
        {/* For small and medium screens (Swiper slider) */}
        <div className="">

          <div class="grid grid-cols-5 gap-10">
            {loadingCategory ? (
              new Array(12).fill(null).map((_, index) => (
                <div>
                  key={`loadingcategory-${index}`}
                  className="bg-white rounded-lg p-4 min-h-36 grid gap-2 shadow-lg animate-pulse"

                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              ))
            ) : (
              categoryData.map((cat) => (
                <div
                  key={`displayCategory-${cat._id}`}
                  className="w-full hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div onClick={() => handleRedirectProductListpage(cat._id, cat.name)} // Updated function call
                    className="brake-clutch-iteam bg-gray-100 rounded-lg shadow-md p-3 flex flex-col justify-between">
                    <div className="">
                      <div className="p-3 bg-white">
                        <img
                          src={cat.image}
                          className=""
                          alt={cat.name}
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

      <div class="container mx-auto px-4 bike-parts">
          <div class="home-heading text-center">
            <h2>Bike Body Parts</h2>
            <p>Five star rated latest best selling products</p>
          </div>
        <div class="">
          <div class="grid grid-cols-6 gap-4">
                <div class="bike-parts-iteam p-3 flex flex-col justify-between">
                  <div class="">
                    <div class="p-3 bg-white rounded-full shadow-lg">
                    <img src={bannerMobile} className="rounded-full" />      
                      {/* <img src="http://res.cloudinary.com/dcwfrn0c0/image/upload/v1733836619/binkeyit/a5h3pzundruz2uiyfgvo.svg" class="" alt="Bike"> */}
                    </div>
                    <h3 class="text-lg font-semibold text-center mt-3">Silencer</h3>
                  </div>
                </div>
                <div class="bike-parts-iteam p-3 flex flex-col justify-between">
                  <div class="">
                    <div class="p-3 bg-white rounded-full shadow-lg">
                    <img src={bannerMobile} className="rounded-full" />      
                      {/* <img src="http://res.cloudinary.com/dcwfrn0c0/image/upload/v1733836619/binkeyit/a5h3pzundruz2uiyfgvo.svg" class="" alt="Bike"> */}
                    </div>
                    <h3 class="text-lg font-semibold text-center mt-3">Silencer</h3>
                  </div>
                </div>
                <div class="bike-parts-iteam p-3 flex flex-col justify-between">
                  <div class="">
                    <div class="p-3 bg-white rounded-full shadow-lg">
                    <img src={bannerMobile} className="rounded-full" />      
                      {/* <img src="http://res.cloudinary.com/dcwfrn0c0/image/upload/v1733836619/binkeyit/a5h3pzundruz2uiyfgvo.svg" class="" alt="Bike"> */}
                    </div>
                    <h3 class="text-lg font-semibold text-center mt-3">Silencer</h3>
                  </div>
                </div>
                <div class="bike-parts-iteam p-3 flex flex-col justify-between">
                  <div class="">
                    <div class="p-3 bg-white rounded-full shadow-lg">
                    <img src={bannerMobile} className="rounded-full" />      
                      {/* <img src="http://res.cloudinary.com/dcwfrn0c0/image/upload/v1733836619/binkeyit/a5h3pzundruz2uiyfgvo.svg" class="" alt="Bike"> */}
                    </div>
                    <h3 class="text-lg font-semibold text-center mt-3">Silencer</h3>
                  </div>
                </div>
                <div class="bike-parts-iteam p-3 flex flex-col justify-between">
                  <div class="">
                    <div class="p-3 bg-white rounded-full shadow-lg">
                    <img src={bannerMobile} className="rounded-full" />      
                      {/* <img src="http://res.cloudinary.com/dcwfrn0c0/image/upload/v1733836619/binkeyit/a5h3pzundruz2uiyfgvo.svg" class="" alt="Bike"> */}
                    </div>
                    <h3 class="text-lg font-semibold text-center mt-3">Silencer</h3>
                  </div>
                </div>
                <div class="bike-parts-iteam p-3 flex flex-col justify-between">
                  <div class="">
                    <div class="p-3 bg-white rounded-full shadow-lg">
                    <img src={bannerMobile} className="rounded-full" />      
                      {/* <img src="http://res.cloudinary.com/dcwfrn0c0/image/upload/v1733836619/binkeyit/a5h3pzundruz2uiyfgvo.svg" class="" alt="Bike"> */}
                    </div>
                    <h3 class="text-lg font-semibold text-center mt-3">Silencer</h3>
                  </div>
                </div>
            </div> 
          </div>
      </div>   
      
      <div className="container mx-auto px-4 my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 descount-offer">
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg descount-offer-left">
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <h2 className="font-semibold text-sm">BIG SALE COUNTDOWN</h2>
              <h3 className="text-3xl font-bold my-2 text-4xl">Hurray Up!</h3>
              <p className="text-xs mb-4 pr-12">
                Lorem ipsum dolor sit amet consectetur. Netus in pulvinar convallis ut arcu aliquet. grr vida interdum  amet  nunc  in amet adi 
              </p>
            </div>  
            <div className="text-center">
              <span className="text-7xl font-extrabold">75%</span>
              <p className="text-3xl mt-1">Off</p>
              <Link to="" className="mt-4 inline-block btn-view"> View Details </Link>
            </div>
          </div>  
        </div>
        <div className="text-white p-6 rounded-lg shadow-lg descount-offer-right">
            <div className="descount-offer-text">
              <h2 className="font-semibold text-sm">Mega Motorcycle Parts Offer</h2>
              <h3 className="text-3xl font-bold my-5">Discover New Arrivals</h3>
              <p className="text-sm mb-4">1000+ Spare parts!</p>
              {/* <Link
                to="" className="mt-4 inline-block bg-white text-blue-600 py-2 px-4 rounded-lg">
                Shop Now
              </Link> */}
            </div>  
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
