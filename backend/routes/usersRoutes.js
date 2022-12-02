import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUsersById,
  updateUser,
} from '../controller/userController.js';
import { protect, admin } from '../middlerware/authMiddleware.js';

//@desc Fetch all user
//@route POST /api/users/login
//@access Public

// router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/').post(registerUser);
router.route('/admin').get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUsersById)
  .put(protect, admin, updateUser);

export default router;
