import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import Divider from '../components/Divider';
import image1 from '../assets/minute_delivery.png';
import image2 from '../assets/Best_Prices_Offers.png';
import image3 from '../assets/imagelogo.jpg';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from '../components/AddToCartButton';

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]); // Store ratings and comments
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const imageContainer = useRef();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await Axios.post('http://localhost:8080/api/product/get-product-details', { productId });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingsAndComments = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Get userId from local storage or state
      const response = await Axios.get('http://localhost:8080/api/product/get-rating-comments', {
        params: { productId, userId }
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setRatings(responseData.data);
      }
    } catch (error) {
      setError("Error fetching ratings/comments. Please try again later.");
    }
  };

  const handleRatingSubmit = async () => {
    if (newRating > 0 && newComment.trim() !== "" && username.trim() !== "") {
      try {
        const token = localStorage.getItem('token');
        const response = await Axios.post('http://localhost:8080/api/product/add-rating-comment', {
          productId, rating: newRating, comment: newComment, username
        }, { headers: { 'Authorization': `Bearer ${token}` } });

        const { data: responseData } = response;
        if (responseData.success) {
          setRatings([...ratings, responseData.data]);
          setNewRating(0);
          setNewComment("");
          setUsername("");
        }
      } catch (error) {
        AxiosToastError(error);
      }
    } else {
      alert("Please provide a username, rating, and a comment.");
    }
  };

  const handleRatingDelete = async (ratingId) => {
    try {
      const response = await Axios.delete('http://localhost:8080/api/product/delete-rating-comment', { data: { ratingId } });
      const { data: responseData } = response;
      if (responseData.success) {
        setRatings(prevRatings => prevRatings.filter(rating => rating._id !== ratingId));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchRatingsAndComments();
  }, [params]);

  const handleScrollRight = () => imageContainer.current.scrollLeft += 100;
  const handleScrollLeft = () => imageContainer.current.scrollLeft -= 100;

  const getLoggedInUserId = () => {
    return localStorage.getItem('userId');
  };

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {data.image.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}
              ></div>
            );
          })}
        </div>
        <div className='grid relative'>
          <div
            ref={imageContainer}
            className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md'
                  key={img + index}
                >
                  <img
                    src={img}
                    alt='min-product'
                    onClick={() => setImage(index)}
                    className='w-full h-full object-scale-down'
                  />
                </div>
              );
            })}
          </div>
          <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
            <button
              onClick={handleScrollLeft}
              className='z-10 bg-white relative p-1 rounded-full shadow-lg'
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className='z-10 bg-white relative p-1 rounded-full shadow-lg'
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className='my-4 hidden lg:grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div key={index}>
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base'>{data?.more_details[element]}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <Divider />
        <div>
          <p className=''>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount && (
              <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
            )}
            {data.discount && (
              <p className='font-bold text-green-600 lg:text-2xl'>
                {data.discount}% <span className='text-base text-neutral-500'>Discount</span>
              </p>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className='text-lg text-red-500 my-2'>Out of Stock</p>
        ) : (
          <div className='my-4'>
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className='font-semibold'>Why shop from Bikeparts? </h2>
        <div>
          <div className='flex  items-center gap-4 my-4'>
            <img
              src={image1}
              alt='superfast delivery'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>
                Get your order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className='flex  items-center gap-4 my-4'>
            <img
              src={image2}
              alt='Best prices offers'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>Best price destination with offers directly from the manufacturers.</p>
            </div>
          </div>
          <div className='flex  items-center gap-4 my-4'>
            <img
              src={image3}
              alt='Wide Assortment'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>
                Choose from 2000+ products across Parts and Spare for Bike,
                & other categories.
              </p>
            </div>
          </div>
        </div>

        <Divider />
        {/* Ratings and Comments */}
        <div className="my-4">
          <h3 className="text-lg font-semibold">Ratings & Reviews</h3>
          <div className="my-3">
            {/* Input fields for new rating and comment */}
            <div className="my-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full rounded-md"
                placeholder="Username"
              />
              <input
                type="number"
                max={5}
                min={1}
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="border p-2 w-16 rounded-md mt-2"
                placeholder="Rating"
              />
              <textarea
                className="border p-2 w-full rounded-md mt-2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment"
              />
              <button 
                onClick={handleRatingSubmit} 
                className="bg-yellow-500 text-white px-3 py-1 mt-0 rounded-md-5"
              >
                Submit
              </button>
            </div>
            
            {/* Display ratings and comments in a table format */}
            <div className="max-h-64 overflow-auto">
              {ratings.length > 0 && (
                <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Username</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Comment</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rating</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date & Time</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ratings.map((rating) => (
                      <tr key={rating._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">{rating.username}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{rating.comment}</td>
                        <td className="px-4 py-2 text-sm text-gray-700">{rating.rating}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{new Date(rating.date).toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-center">
                          {getLoggedInUserId() === rating.userId && rating.comment && rating.rating && (
                            <button
                              onClick={() => handleRatingDelete(rating._id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {ratings.length === 0 && <p className="text-sm text-gray-500">No reviews yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;