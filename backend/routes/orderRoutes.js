import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
  getMyOrders,
//   getOrders,
} from '../controller/orderController.js'
import { protect } from '../middlerware/authMiddleware.js'

// router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/').post(protect, addOrderItems).get(protect)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
