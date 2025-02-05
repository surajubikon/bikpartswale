import React, { useEffect, useState } from 'react';
import UploadBannerModel from '../components/UploadBanner'; // Change for Banner
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditBanner from '../components/EditBanner'; // Change for Banner
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const BannerPage = () => {
    const [openUploadBanner, setOpenUploadBanner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bannersData, setBannersData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        image: '', // Only image field now
    });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteBanner, setDeleteBanner] = useState({
        _id: '',
    });

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getBannerController, // Update with API for banners
            });
            const { data: responseData } = response;

            if (responseData.success) {
                setBannersData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleDeleteBanner = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteBannerController,
                data: { id: deleteBanner._id }  // Pass id in the body
            });
    
            const { data: responseData } = response;
    
            if (responseData.success) {
                toast.success(responseData.message);
                fetchBanners();
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    
    return (
        <section className=''>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Banners</h2>
                <button
                    onClick={() => setOpenUploadBanner(true)}
                    className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'
                >
                    Add Banner
                </button>
            </div>
            {!bannersData[0] && !loading && <NoData />}

            <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {bannersData.map((banner, index) => {
                    return (
                        <div className='w-32 h-56 rounded shadow-md' key={banner._id}>
                            <img
                                alt="Banner"
                                src={banner.image} // Only using image now
                                className='w-full object-scale-down'
                            />
                            <div className='items-center h-9 flex gap-2'>
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(banner);
                                    }}
                                    className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true);
                                        setDeleteBanner(banner);
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

            {openUploadBanner && (
                <UploadBannerModel fetchData={fetchBanners} close={() => setOpenUploadBanner(false)} />
            )}

            {openEdit && (
                <EditBanner data={editData} close={() => setOpenEdit(false)} fetchData={fetchBanners} />
            )}

            {openConfirmBoxDelete && (
                <CofirmBox
                    close={() => setOpenConfirmBoxDelete(false)}
                    cancel={() => setOpenConfirmBoxDelete(false)}
                    confirm={handleDeleteBanner}
                />
            )}
        </section>
    );
};

export default BannerPage;
