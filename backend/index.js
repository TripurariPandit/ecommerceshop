import './env.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/mongoose.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import productsRouter from './src/features/products/products.router.js';
import usersRouter from './src/features/users/user.router.js';
import cartItemsRouter from './src/features/cartItems/cartItem.router.js';
import orderRouter from './src/features/orders/order.router.js';
import webhookRouter from './src/features/orders/webhook.router.js';

const app = express();
app.use(cors());

app.use('/api/order', webhookRouter);

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res)=>{
    return res.send("express is running");
});

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/cartitems', jwtAuth, cartItemsRouter);
app.use('/api/orders', jwtAuth, orderRouter);
app.listen(4000, ()=>{
    console.log('server is running on port 4000');
    connectDB();
}); 