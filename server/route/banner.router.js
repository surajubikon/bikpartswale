import { Router } from "express";
import auth from "../middleware/auth.js";
import { CreateBannerController, getBannerController, updateBannerController, deleteBannerController} from "../controllers/bannner.controller.js";

const bannerRouter = Router()

bannerRouter.post('/create-banner',auth,CreateBannerController)
bannerRouter.get("/get-banner",getBannerController)
bannerRouter.put('/update-banner/:id',auth,updateBannerController)
bannerRouter.delete('/delete',auth,deleteBannerController)

export default bannerRouter