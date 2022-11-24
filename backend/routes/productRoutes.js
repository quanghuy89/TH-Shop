import express from 'express';
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Product from '../models/productModel.js'
import {getProducts,getProductById,deleteProduct,createProduct,updateProduct,getTopProducts} from '../controller/productController.js'
import { protect, admin } from '../middlerware/authMiddleware.js';

//@desc Fetch all produts
//@route GET /api/products
//@access Public



// router.get('/', asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     // res.status(401)
//     // throw new Error('Not Athorized')
//     res.json(products)
// }))



router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top',getTopProducts)

//@desc Fetch single produt
//@route GET /api/products/:id
//@access Public

// router.route('/:id').get(getProductById)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)


// router.get('/:id', asyncHandler(async(req, res) => {
//     const product = await Product.findById(req.params.id)
    
//     if (product) {
//         res.json(product)
//     } else {
//         // res.status(404).json({ message: 'Product not found' })
//         res.status(404)
//         throw new Error('Product not found')
//     }

//     // res.json(product)
// }))

export default router