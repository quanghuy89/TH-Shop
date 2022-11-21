import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import { addOrderItems, getOrderById, getMyOrders } from '../controller/orderController.js';
import { protect } from '../middlerware/authMiddleware.js';

//@desc Fetch all produts
//@route POST /api/users/login
//@access Public

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/myorders').get(protect, getMyOrders);

export default router;
