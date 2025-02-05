import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSubBrand = ({ close, data, fetchData }) => {
    const [subBrandData, setSubBrandData] = useState({
        _id: data._id,
        name: data.name,
        image: data.image,
        brand: data.brand || []
    });

    const allBrand = useSelector(state => state.product.allBrand);

    useEffect(() => {
        setSubBrandData({
            _id: data._id,
            name: data.name,
            image: data.image,
            brand: data.brand || []
        });
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSubBrandData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadSubBrandImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const response = await uploadImage(file);
        const { data: ImageResponse } = response;

        setSubBrandData((prev) => ({
            ...prev,
            image: ImageResponse.data.url
        }));
    };

    const handleRemoveBrandSelected = (brandId) => {
        const index = subBrandData.brand.findIndex((el) => el._id === brandId);
        subBrandData.brand.splice(index, 1);
        setSubBrandData((prev) => ({
            ...prev
        }));
    };

    const handleSubmitSubBrand = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                url: "http://localhost:5000/api/sub-brands/update",
                method: "PUT",
                data: subBrandData
            });
            // const response = await Axios({
            //     url: "http://localhost:5000/api/sub-brands/update",
            //     method: "PUT",
            //     data: subBrandData
            // });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                if (close) {
                    close();
                }
                if (fetchData) {
                    fetchData();
                }
            }

        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-5xl bg-white p-4 rounded'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Edit Sub Brand</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3 grid gap-3' onSubmit={handleSubmitSubBrand}>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            name='name'
                            value={subBrandData.name}
                            onChange={handleChange}
                            className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col lg:flex-row items-center gap-3'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !subBrandData.image ? (
                                        <p className='text-sm text-neutral-400'>No Image</p>
                                    ) : (
                                        <img
                                            alt='subBrand'
                                            src={subBrandData.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    )
                                }
                            </div>
                            <label htmlFor='uploadSubBrandImage'>
                                <div className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer'>
                                    Upload Image
                                </div>
                                <input
                                    type='file'
                                    id='uploadSubBrandImage'
                                    className='hidden'
                                    onChange={handleUploadSubBrandImage}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='grid gap-1'>
                        <label>Select Brand</label>
                        <div className='border focus-within:border-primary-200 rounded'>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subBrandData.brand.map((brand) => (
                                        <p key={brand._id + "selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                            {brand.name}
                                            <div className='cursor-pointer hover:text-red-600' onClick={() => handleRemoveBrandSelected(brand._id)}>
                                                <IoClose size={20} />
                                            </div>
                                        </p>
                                    ))
                                }
                            </div>

                            <select
                                className='w-full p-2 bg-transparent outline-none border'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const brandDetails = allBrand.find((el) => el._id == value);

                                    setSubBrandData((prev) => ({
                                        ...prev,
                                        brand: [...prev.brand, brandDetails]
                                    }));
                                }}
                            >
                                <option value={""}>Select Brand</option>
                                {
                                    allBrand?.map((brand) => (
                                        <option value={brand._id} key={brand._id + "subBrand"}>{brand.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <button
    className={`px-4 py-2 border
        ${subBrandData?.name && subBrandData?.image && subBrandData?.brand?.length > 0 ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-200"}    
        font-semibold
    `}
    disabled={!(subBrandData?.name && subBrandData?.image && subBrandData?.brand?.length > 0)}
>
    Submit
</button>

                </form>
            </div>
        </section>
    );
};

export default EditSubBrand;
