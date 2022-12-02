import express from 'express';
import  brands from '../data/datatest.js';
import categoryList  from '../data/category.js';
import Brand from '../models/brandModel.js';
import Category from '../models/categoryModel.js';
// import Product from '../models/productModel.js';
// import Rating from '../models/ratingModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
//   await Product.remove({}); // first for remove if exists into db, don't fetch duplicate
//   const createdProducts = await Product.insertMany(productsList); //create products into product table

  await Category.remove({}); // first for remove if exists into db, don't fetch duplicate
  const createdCategory = await Category.insertMany(categoryList); //create category into category table

//   await Rating.remove({}); // first for remove if exists into db, don't fetch duplicate
//   const createdRating = await Rating.insertMany(ratingList); //create category into category table

  await Brand.remove({}); // first for remove if exists into db, don't fetch duplicate
  const createdBrand = await Brand.insertMany(brands); //create category into category table


  res.send({ createdCategory, createdBrand });
});

export default seedRouter;