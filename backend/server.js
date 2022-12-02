import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlerware/errorMiddleware.js';
import color from 'colors';
import productRoutes from './routes/productRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import seedRoutes from './routes/seedRoutes.js';


import categoryList from './data/category.js';
import brands from './data/datatest.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use('/api/products', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/seed', seedRoutes);


//category routes
app.get('/api/category', (req, res) => {
    res.send(categoryList);
})

//Route for brand
app.get('/api/brand', (req, res) => {
    res.send(brands);
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} port ${process.env.PORT}`.yellow.bold)
);
