import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middlerware/errorMiddleware.js';
import color from 'colors'
import productRoutes from './routes/productRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express();

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.originalUrl)
    next();
})

app.get('/', (req, res) => {
    res.send('API is running....')
})

app.use('/api/products', productRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${process.env.PORT}`.yellow.bold))