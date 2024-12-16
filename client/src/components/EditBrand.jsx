import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditBrand = ({ close, fetchData, data: BrandData }) => {
    const [data, setData] = useState({
        _id: BrandData._id,
        name: BrandData.name,
        image: BrandData.image, // Updated to 'logo' for brand-specific context
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await Axios({
                ...SummaryApi.updateBrands, // Updated API endpoint for brand
                data,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadBrandLogo = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const response = await uploadImage(file);
            const { data: ImageResponse } = response;

            setData((prev) => ({ ...prev, logo: ImageResponse.data.url }));
            toast.success("Logo uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload logo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full p-4 rounded">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Edit Brand</h1>
                    <button onClick={close} className="w-fit block ml-auto">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="my-3 grid gap-4" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="grid gap-1">
                        <label htmlFor="brandName">Brand Name</label>
                        <input
                            type="text"
                            id="brandName"
                            placeholder="Enter brand name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                        />
                    </div>

                    {/* Logo Upload Section */}
                    <div className="grid gap-1">
                        <label>Brand Logo</label>
                        <div className="flex gap-4 flex-col lg:flex-row items-center">
                            <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                                {data.logo ? (
                                    <img
                                        alt="Brand Logo"
                                        src={data.logo}
                                        className="w-full h-full object-scale-down"
                                    />
                                ) : (
                                    <p className="text-sm text-neutral-500">No Logo</p>
                                )}
                            </div>
                            <label htmlFor="uploadBrandLogo">
                                <div
                                    className={`
                                        ${!data.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100"}  
                                        px-4 py-2 rounded cursor-pointer border font-medium flex items-center justify-center
                                    `}
                                >
                                    {loading ? (
                                        <span className="loader"></span>
                                    ) : (
                                        "Upload Logo"
                                    )}
                                </div>
                                <input
                                    disabled={!data.name || loading}
                                    onChange={handleUploadBrandLogo}
                                    type="file"
                                    id="uploadBrandLogo"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className={`  
                            ${data.name && data.logo ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300"}
                            py-2 font-semibold flex items-center justify-center
                        `}
                        disabled={loading || !data.name || !data.logo}
                    >
                        {loading ? "Updating..." : "Update Brand"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditBrand;
