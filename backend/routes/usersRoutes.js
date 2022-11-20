import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controller/userController.js';
import { protect } from '../middlerware/authMiddleware.js';

//@desc Fetch all produts
//@route POST /api/users/login
//@access Public

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
