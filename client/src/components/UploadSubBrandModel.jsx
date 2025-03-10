import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';

const UploadSubBrandModel = ({ close, fetchData }) => {
    const [subBrandData, setSubBrandData] = useState({
        name: "",
        image: "",
        brand: [],
    });
    const [allBrands, setAllBrands] = useState([]); // List to hold fetched brands

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await Axios(SummaryApi.getBrands);
                setAllBrands(response.data.data); // Fetch brands
            } catch (error) {
                AxiosToastError(error);
            }
        };
        fetchBrands();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubBrandData((prev) => ({
            ...prev,
            [name]: value.trim(), // Trimming spaces
        }));
    };

    const handleUploadSubBrandImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const response = await uploadImage(file);
            const { data: ImageResponse } = response;
            setSubBrandData((prev) => ({
                ...prev,
                image: ImageResponse.data.url,
            }));
        } catch (error) {
            toast.error("Image upload failed!");
        }
    };

    const handleRemoveBrandSelected = (brandId) => {
        const updatedBrands = subBrandData.brand.filter((brand) => brand._id !== brandId);
        setSubBrandData((prev) => ({
            ...prev,
            brand: updatedBrands,
        }));
    };

    const handleSubmitSubBrand = async (e) => {
        e.preventDefault();
        const { name, image, brand } = subBrandData;
    
        if (!name || !image || brand.length === 0) {
            toast.error("All fields are required!");
            return;
        }
    
        // Send only the first brand's ID
        const payload = {
            name,
            image,
            brand: brand[0]._id, // Assuming a single brand is required
        };
    
        try {
            const response = await Axios.post(
                "http://localhost:5173/api/sub-brands/add-subbrand",
                payload
            );
            // const response = await Axios.post(
            //     "http://localhost:5000/api/sub-brands/add-subbrand",
            //     payload
            // );
            const { data: responseData } = response;
    
            if (responseData.success) {
                toast.success(responseData.message);
                close?.(); // Close modal if defined
                fetchData?.(); // Refresh data if defined
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    

    const addBrandToSubBrand = (brandId) => {
        const brandDetails = allBrands.find((brand) => brand._id === brandId);
        if (brandDetails && !subBrandData.brand.find((b) => b._id === brandId)) {
            setSubBrandData((prev) => ({
                ...prev,
                brand: [...prev.brand, brandDetails],
            }));
        }
    };

    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white p-4 rounded">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="font-semibold">Add Sub Brand</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="my-3 grid gap-3" onSubmit={handleSubmitSubBrand}>
                    <div className="grid gap-1">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={subBrandData.name}
                            onChange={handleChange}
                            className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded"
                        />
                    </div>
                    <div className="grid gap-1">
                        <p>Image</p>
                        <div className="flex flex-col lg:flex-row items-center gap-3">
                            <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                                {!subBrandData.image ? (
                                    <p className="text-sm text-neutral-400">No Image</p>
                                ) : (
                                    <img
                                        alt="subBrand"
                                        src={subBrandData.image}
                                        className="w-full h-full object-scale-down"
                                    />
                                )}
                            </div>
                            <label htmlFor="uploadSubBrandImage">
                                <div className="px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer">
                                    Upload Image
                                </div>
                                <input
                                    type="file"
                                    id="uploadSubBrandImage"
                                    className="hidden"
                                    onChange={handleUploadSubBrandImage}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid gap-1">
                        <label>Select Brand</label>
                        <select
                            className="w-full p-2 bg-transparent outline-none border"
                            onChange={(e) => addBrandToSubBrand(e.target.value)}
                        >
                            <option value="">Select Brand</option>
                            {allBrands.map((brand) => (
                                <option value={brand._id} key={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-2">
                        {subBrandData.brand.map((brand) => (
                            <div key={brand._id} className="flex items-center gap-2">
                                <span>{brand.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveBrandSelected(brand._id)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        className={`px-4 py-2 border ${
                            subBrandData.name && subBrandData.image && subBrandData.brand.length
                                ? "bg-primary-200 hover:bg-primary-100"
                                : "bg-gray-200"
                        } font-semibold`}
                        type="submit"
                        disabled={!subBrandData.name || !subBrandData.image || !subBrandData.brand.length}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UploadSubBrandModel;
