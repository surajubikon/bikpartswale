import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    image : {
        type : String,
        default : ''
    },
}, { timestamps: true });

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
