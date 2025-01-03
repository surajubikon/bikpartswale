import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddBrandsmodelsController, getBrandsmodelsController,updateBrandsmodelsController,deleteBrandsmodelsController } from '../controllers/brandsmodel.controller.js'

const brandsmodelsRouter = Router()

brandsmodelsRouter.post("/add-brands",auth,AddBrandsmodelsController)
brandsmodelsRouter.get('/get',getBrandsmodelsController)
brandsmodelsRouter.put('/update',auth,updateBrandsmodelsController)
brandsmodelsRouter.delete("/delete",auth,deleteBrandsmodelsController)

export default brandsmodelsRouter
