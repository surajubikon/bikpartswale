import React, { useEffect, useState } from "react";
import UploadOffer from "../components/UplaodOffer"; // Change for New Deals
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditOffer from "../components/EditOffer"; // Change for New Deals
import ConfirmBox from "../components/CofirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const Offer = () => {
  const [openUploadNewDeal, setOpenUploadNewDeal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newDealsData, setNewDealsData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: ""
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteNewDeal, setDeleteNewDeal] = useState({
    _id: "",
  });

  const fetchNewDeals = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getNewlineController, // APgI endpoint for new deals
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setNewDealsData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewDeals();
  }, []);

  const handleDeleteNewDeal = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteNewlineController,
        url: SummaryApi.deleteNewlineController.url.replace(':id', deleteNewDeal._id), 
        data: deleteNewDeal,
    });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchNewDeals();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="">
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">New Deals</h2>
        <button
          onClick={() => setOpenUploadNewDeal(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add New Deal
        </button>
      </div>
      {!newDealsData[0] && !loading && <NoData />}

      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {newDealsData.map((deal, index) => {
          return (
            <div className="w-32 h-56 rounded shadow-md" key={deal._id}>
              {/* Removed image */}
              <div className="text-center mt-2">
                <p className="text-sm font-semibold">{deal.name}</p>
                {/* Removed price */}
              </div>
              <div className="items-center h-9 flex gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(deal);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteNewDeal(deal);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}

      {openUploadNewDeal && (
        <UploadOffer
          fetchData={fetchNewDeals}
          close={() => setOpenUploadNewDeal(false)}
        />
      )}

      {openEdit && (
        <EditOffer
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchNewDeals}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteNewDeal}
        />
      )}
    </section>
  );
};

export default Offer;
