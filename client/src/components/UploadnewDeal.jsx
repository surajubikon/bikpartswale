import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadNewDealModel = ({ close, fetchData }) => {
    const [data, setData] = useState({
        name: "",
        price: "",
        product: "",
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value.trim(), // Trim spaces for cleaner input
        }));
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await Axios(SummaryApi.getAllProducts); // API call
            const { data: responseData } = response;

            // Ensure the product data is properly accessed
            const products = responseData.data;  // Access data array inside the responseData
            if (responseData.success) {
                setProducts(products); // Set the products state with the correct data
            } else {
                toast.error(responseData.message || "Failed to fetch products");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { name, price, product } = data;
    
        if (!name || !price || !product) {
            toast.error("All fields are required!");
            return;
        }
    
        try {
            setLoading(true);
            // Prepare data to match the backend expected fields
            const dealData = {
                product: product,  // Send 'product' directly as expected in your schema
                price: price,      // Send 'price' as 'dealPrice'
                name: name,        // 'name' should be used as the 'description' or keep as is
            };
    
            const response = await Axios({
                ...SummaryApi.createnewdealController,
                data: dealData, // Send the correct data structure
            });
    
            const { data: responseData } = response;
    
            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            } else {
                toast.error(responseData.message || "Something went wrong");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full p-4 rounded">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Add New Deal</h1>
                    <button onClick={close} className="w-fit block ml-auto">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="dealName">Name</label>
                        <input
                            type="text"
                            id="dealName"
                            placeholder="Enter deal name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="dealPrice">Price</label>
                        <input
                            type="number"
                            id="dealPrice"
                            placeholder="Enter deal price"
                            value={data.price}
                            name="price"
                            onChange={handleOnChange}
                            className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="product">Product</label>
                        {loading ? (
                            <p>Loading products...</p> // Show loading text or spinner while fetching
                        ) : (
                            <select
                            id="product"
                            value={data.product}
                            name="product"
                            onChange={handleOnChange}
                            className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                        >
                            <option value="">Select a product</option>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No products available</option>
                            )}
                        </select>
                        
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !data.name || !data.price || !data.product}
                        className={`px-4 py-2 border ${data.name && data.price && data.product
                                ? "bg-primary-200 hover:bg-primary-100"
                                : "bg-gray-200"
                            } font-semibold`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadNewDealModel;
