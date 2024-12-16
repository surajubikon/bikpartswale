import React, { useEffect, useState } from 'react';
import UploadBrandsModel from '../components/UploadBrandsModel'; // Change for Brands
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditBrand from '../components/EditBrand'; // Change for Brands
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const BrandsPage = () => {
    const [openUploadBrand, setOpenUploadBrand] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brandsData, setBrandsData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        image: '',
    });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteBrand, setDeleteBrand] = useState({
        _id: '',
    });

    const fetchBrands = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getBrands, // API endpoint for brands
            });
            const { data: responseData } = response;

            if (responseData.success) {
                setBrandsData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleDeleteBrand = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteBrands, // API endpoint for delete brand
                data: deleteBrand,
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchBrands();
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className=''>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Brands</h2>
                <button
                    onClick={() => setOpenUploadBrand(true)}
                    className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'
                >
                    Add Brand
                </button>
            </div>
            {!brandsData[0] && !loading && <NoData />}

            <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {brandsData.map((brand, index) => {
                    return (
                        <div className='w-32 h-56 rounded shadow-md' key={brand._id}>
                            <img
                                alt={brand.name}
                                src={brand.image}
                                className='w-full object-scale-down'
                            />
                            <div className='items-center h-9 flex gap-2'>
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(brand);
                                    }}
                                    className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true);
                                        setDeleteBrand(brand);
                                    }}
                                    className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {loading && <Loading />}

            {openUploadBrand && (
                <UploadBrandsModel fetchData={fetchBrands} close={() => setOpenUploadBrand(false)} />
            )}

            {openEdit && (
                <EditBrand data={editData} close={() => setOpenEdit(false)} fetchData={fetchBrands} />
            )}

            {openConfirmBoxDelete && (
                <CofirmBox
                    close={() => setOpenConfirmBoxDelete(false)}
                    cancel={() => setOpenConfirmBoxDelete(false)}
                    confirm={handleDeleteBrand}
                />
            )}
        </section>
    );
};

export default BrandsPage;
