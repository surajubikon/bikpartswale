import BrandsModel from "../models/brandsmodel.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const AddBrandsmodelsController = async(request,response)=>{
    try {
        const { name , image } = request.body 

        if(!name || !image){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const AddBrandsmodels = new BrandsModel({
            name,
            image
        })

        const saveBrandsmodels = await AddBrandsmodels.save()

        if(!saveBrandsmodels){
            return response.status(500).json({
                message : "Not Created",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Add Brands models Successfully",
            data : saveBrandsmodels,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getBrandsmodelsController = async(request,response)=>{
    try {
        
        const data = await BrandsModel.find().sort({ createdAt : -1 })

        return response.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.messsage || error,
            error : true,
            success : false
        })
    }
}

export const updateBrandsmodelsController = async(request,response)=>{
    try {
        const { _id ,name, image } = request.body 

        const update = await BrandsModel.updateOne({
            _id : _id
        },{
           name, 
           image 
        })

        return response.json({
            message : "Updated Brands",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteBrandsmodelsController = async(request,response)=>{
    try {
        const { _id } = request.body 

        const checkSubCategory = await SubCategoryModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        const checkProduct = await ProductModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        if(checkSubCategory >  0 || checkProduct > 0 ){
            return response.status(400).json({
                message : "brands is already use can't delete",
                error : true,
                success : false
            })
        }

        const deleteCategory = await BrandsModel.deleteOne({ _id : _id})

        return response.json({
            message : "Delete brands successfully",
            data : deleteCategory,
            error : false,
            success : true
        })

    } catch (error) {
       return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
       }) 
    }
}