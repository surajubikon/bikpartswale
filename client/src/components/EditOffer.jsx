import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditOffer = ({ close, fetchData, data: TagData }) => {
    const [data, setData] = useState({
        _id: TagData._id,
        name: TagData.name, // Only name will be editable now
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
                ...SummaryApi.updateNewlineController,
                url: SummaryApi.updateNewlineController.url.replace(':id', data._id),   
                data: {
                    name: data.name,
                },
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

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
            <div className="bg-white max-w-4xl w-full p-4 rounded">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold">Edit Tag</h1>
                    <button onClick={close} className="w-fit block ml-auto">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="my-3 grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="tagName">Tag Name</label>
                        <input
                            type="text"
                            id="tagName"
                            placeholder="Enter tag name"
                            value={data.name}
                            name="name"
                            onChange={handleOnChange}
                            className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                        />
                    </div>

                    <button
                        className={`  
                            ${data.name ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300"}
                            py-2 font-semibold flex items-center justify-center
                        `}
                        disabled={loading || !data.name}
                    >
                        {loading ? "Updating..." : "Update Tag"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditOffer;
