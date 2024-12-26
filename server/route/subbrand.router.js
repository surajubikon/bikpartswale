// routes/subbrand.router.js

import { Router } from 'express';
import { addSubBrandController, getSubBrandsByCategoryController, updateSubBrandController, deleteSubBrandController } from '../controllers/subbrand.controller.js';
import auth from '../middleware/auth.js'; // Add authorization middleware

const subBrandRouter = Router();

// Add a new SubBrand
subBrandRouter.post('/add-subbrand', auth, addSubBrandController);

// Get SubBrands by Brand category
subBrandRouter.get('/get', getSubBrandsByCategoryController);

// Update a SubBrand
subBrandRouter.put('/update', auth, updateSubBrandController);

// Delete a SubBrand
subBrandRouter.delete('/delete', auth, deleteSubBrandController);

export default subBrandRouter;
