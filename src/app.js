import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

connectDB();

export default app;
