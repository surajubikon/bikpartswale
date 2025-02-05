import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditBanner = ({ close, fetchData, data: BannerData }) => {
    const [data, setData] = useState({
        _id: BannerData._id,
        image: BannerData.image, // Updated to 'image' for banner-specific context
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            // Dynamically append the banner ID to the URL
            const response = await Axios({
                ...SummaryApi.updateBannerController,
                url: `/api/banner/update-banner/${data._id}`,  // Pass the banner ID here
                data: { image: data.image },
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
    

    const handleUploadBannerImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const response = await uploadImage(file);
            const { data: ImageResponse } = response;

            setData((prev) => ({ ...prev, image: ImageResponse.data.url }));
            toast.success("Banner image uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload banner image");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full p-4 rounded">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Edit Banner</h1>
                    <button onClick={close} className="w-fit block ml-auto">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="my-3 grid gap-4" onSubmit={handleSubmit}>
                    {/* Banner Image Upload Section */}
                    <div className="grid gap-1">
                        <label>Banner Image</label>
                        <div className="flex gap-4 flex-col lg:flex-row items-center">
                            <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                                {data.image ? (
                                    <img
                                        alt="Banner"
                                        src={data.image}
                                        className="w-full h-full object-scale-down"
                                    />
                                ) : (
                                    <p className="text-sm text-neutral-500">No Banner Image</p>
                                )}
                            </div>
                            <label htmlFor="uploadBannerImage">
                                <div
                                    className={`
                                        ${!data.image ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100"}  
                                        px-4 py-2 rounded cursor-pointer border font-medium flex items-center justify-center
                                    `}
                                >
                                    {loading ? (
                                        <span className="loader"></span>
                                    ) : (
                                        "Upload Banner Image"
                                    )}
                                </div>
                                <input
                                    disabled={loading}
                                    onChange={handleUploadBannerImage}
                                    type="file"
                                    id="uploadBannerImage"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        className={`  
                            ${data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300"}
                            py-2 font-semibold flex items-center justify-center
                        `}
                        disabled={loading || !data.image}
                    >
                        {loading ? "Updating..." : "Update Banner"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditBanner;
