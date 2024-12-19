import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    allCategory: [],
    loadingCategory: false,
    allSubCategory: [],
    allBrands: [], // Added allBrands
    loadingBrands: false, // Added loadingBrands
    allSubBrands: [], // Added allSubBrands
    product: []
};

const productSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            state.allCategory = [...action.payload];
        },
        setLoadingCategory: (state, action) => {
            state.loadingCategory = action.payload;
        },
        setAllSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload];
        },
        setAllBrands: (state, action) => {
            state.allBrands = [...action.payload]; // Handling brands
        },
        setLoadingBrands: (state, action) => {
            state.loadingBrands = action.payload; // Managing loading state for brands
        },
        setAllSubBrands: (state, action) => {
            state.allSubBrands = [...action.payload]; // Handling sub-brands
        }
    }
});

export const { 
    setAllCategory, 
    setAllSubCategory, 
    setLoadingCategory, 
    setAllBrands, // Export setAllBrands
    setLoadingBrands, // Export setLoadingBrands
    setAllSubBrands // Export setAllSubBrands
} = productSlice.actions;

export default productSlice.reducer;
