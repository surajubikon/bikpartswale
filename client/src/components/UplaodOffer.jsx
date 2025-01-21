import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadOffer = ({ close, fetchData }) => {
    const [data, setData] = useState({
        name: "",
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value.trim(), // Trim spaces for cleaner input
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { name } = data;
    
        if (!name) {
            toast.error("Name is required!");
            return;
        }
    
        try {
            setLoading(true);
            // Prepare data to match the backend expected fields
            const dealData = {
                name: name,  // Only sending the name now
            };
    
            const response = await Axios({
                ...SummaryApi.createnewlineController,
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

                    <button
                        type="submit"
                        disabled={loading || !data.name}
                        className={`px-4 py-2 border ${data.name
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

export default UploadOffer;
