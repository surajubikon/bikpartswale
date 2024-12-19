import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Route params ke liye
import UploadSubBrandModel from '../components/UploadSubBrandModel';
import EditSubBrand from '../components/EditSubBrand';
import CofirmBox from '../components/CofirmBox';
import ViewImage from '../components/ViewImage';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const SubBrandsPage = ({ brandId: propBrandId }) => {
  const { brandId: paramBrandId } = useParams(); // Route se brandId fetch karne ke liye
  const brandId = propBrandId || paramBrandId; // Prop ya param se brandId set karna

  const [openUploadSubBrand, setOpenUploadSubBrand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subBrandsData, setSubBrandsData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ name: '', image: '', brandId: brandId });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteSubBrand, setDeleteSubBrand] = useState({ _id: '' });
  const [imageURL, setImageURL] = useState('');
  const columnHelper = createColumnHelper();

  // Sub Brands fetch karne ke liye API call
  const fetchSubBrands = async () => {
    if (!brandId) {
      toast.error('Brand ID is not defined');
      return;
    }
    try {
      setLoading(true);
      const response = await Axios.get(`/api/subbrands/get/${brandId}`);
      const { data: responseData } = response;

      if (responseData.success) {
        setSubBrandsData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // Brands fetch karne ke liye API call
  const fetchBrands = async () => {
    try {
      const response = await Axios.get('/api/brand-models/get');
      const { data: responseData } = response;

      if (responseData.success) {
        setBrands(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (brandId) fetchSubBrands();
    fetchBrands();
  }, [brandId]);

  const column = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-8 h-8 cursor-pointer"
            onClick={() => setImageURL(row.original.image)}
          />
        </div>
      ),
    }),
    columnHelper.accessor('brand', {
      header: 'Brand',
      cell: ({ row }) => {
        const brand = brands.find((brand) => brand._id === row.original.brandId);
        return <span>{brand ? brand.name : 'No Brand'}</span>;
      },
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setOpenEdit(true);
              setEditData(row.original);
            }}
            className="p-2 bg-green-100 rounded-full hover:text-green-600"
          >
            <HiPencil size={20} />
          </button>
          <button
            onClick={() => {
              setOpenConfirmBoxDelete(true);
              setDeleteSubBrand(row.original);
            }}
            className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600"
          >
            <MdDelete size={20} />
          </button>
        </div>
      ),
    }),
  ];

  const handleDeleteSubBrand = async () => {
    try {
      const response = await Axios.delete('/api/subbrands/delete', {
        data: { subBrandId: deleteSubBrand._id },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubBrands();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub Brands</h2>
        <button
          onClick={() => setOpenUploadSubBrand(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Sub Brand
        </button>
      </div>

      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={subBrandsData} column={column} />
      </div>

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL('')} />}

      {openUploadSubBrand && (
        <UploadSubBrandModel
          fetchData={fetchSubBrands}
          close={() => setOpenUploadSubBrand(false)}
        />
      )}

      {openEdit && (
        <EditSubBrand
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubBrands}
        />
      )}

      {openConfirmBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteSubBrand}
        />
      )}
    </section>
  );
};

export default SubBrandsPage;
