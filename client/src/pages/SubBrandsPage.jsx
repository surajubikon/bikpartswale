import React, { useEffect, useState } from 'react';
import UploadSubBrandModel from '../components/UploadSubBrandModel';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage';
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditSubBrand from '../components/EditSubBrand';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';

const SubBrandsPage = () => {
  const [openAddSubBrand, setOpenAddSubBrand] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [ImageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: ""
  });
  const [deleteSubBrand, setDeleteSubBrand] = useState({
    _id: ""
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  const fetchSubBrand = async () => {
    try {
      setLoading(true);
      const response = await Axios.get("http://localhost:8080/api/sub-brands/get");
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubBrand();
  }, []);

  const column = [
    columnHelper.accessor('name', {
      header: "Name"
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className='flex justify-center items-center'>
            <img
              src={row.original.image}
              alt={row.original.name}
              className='w-8 h-8 cursor-pointer'
              onClick={() => {
                setImageURL(row.original.image);
              }}
            />
          </div>
        );
      }
    }),
    columnHelper.accessor("brand", {
      header: "Brand",
      cell: ({ row }) => {
        const brand = row.original.brand[0]; // Access the first item in the brand array
        return (
          <p key={brand?._id} className="shadow-md px-1 inline-block">
            {brand ? brand.name : "No Brand"}
          </p>
        );
      }
    }),
    
    
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <button onClick={() => {
              setOpenEdit(true);
              setEditData(row.original);
            }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
              <HiPencil size={20} />
            </button>
            <button onClick={() => {
              setOpenDeleteConfirmBox(true);
              setDeleteSubBrand(row.original);
            }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
              <MdDelete size={20} />
            </button>
          </div>
        );
      }
    })
  ];
  

    const handleDeleteSubBrand = async () => {
    try {
      const response = await Axios.delete("http://localhost:8080/api/sub-brands/delete", {
        data: deleteSubBrand
      });
  
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubBrand();
        setOpenDeleteConfirmBox(false);
        setDeleteSubBrand({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  

  return (
    <section className=''>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Brand</h2>
        <button onClick={() => setOpenAddSubBrand(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Brand</button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable
          data={data}
          column={column}
        />
      </div>

      {
        openAddSubBrand && (
          <UploadSubBrandModel
            close={() => setOpenAddSubBrand(false)}
            fetchData={fetchSubBrand}
          />
        )
      }

      {
        ImageURL &&
        <ViewImage url={ImageURL} close={() => setImageURL("")} />
      }

      {
        openEdit &&
        <EditSubBrand
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubBrand}
        />
      }

      {
        openDeleteConfirmBox && (
          <CofirmBox
            cancel={() => setOpenDeleteConfirmBox(false)}
            close={() => setOpenDeleteConfirmBox(false)}
            confirm={handleDeleteSubBrand}
          />
        )
      }
    </section>
  );
};

export default SubBrandsPage;


