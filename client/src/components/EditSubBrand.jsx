import React, { useState, useEffect } from "react";
import axios from "axios";

const EditSubBrand = ({ subBrandId, brandId, onClose }) => {
    const [data, setData] = useState({
        name: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch the sub-brand details using subBrandId
        axios
            .get(`/api/sub-brands/${subBrandId}`)
            .then((response) => {
                setData({
                    name: response.data.name,
                    image: response.data.image, // If there's an image URL stored
                });
            })
            .catch((error) => {
                console.error("Error fetching sub-brand data", error);
            });
    }, [subBrandId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create form data for the request
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image) formData.append("image", data.image);

        // Update the sub-brand details
        axios
            .put(`/api/sub-brands/${subBrandId}`, formData)
            .then((response) => {
                setLoading(false);
                onClose(); // Close modal after saving
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error updating sub-brand", error);
            });
    };

    return (
        <section>
            <div>
                <h3>Edit Sub-Brand</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Sub-Brand Name:
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Sub-Brand Image:
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !data.name}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditSubBrand;
