import express from 'express';
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Product from '../models/productModel.js'
import { addOrderItems } from '../controller/orderController.js';
import { protect } from "../middlerware/authMiddleware.js";

//@desc Fetch all produts
//@route POST /api/users/login
//@access Public

router.route('/').post(protect,addOrderItems)




export default router