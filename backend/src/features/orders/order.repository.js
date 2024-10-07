import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import { orderSchema } from "./order.schema.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderModel = mongoose.model('Orders', orderSchema);
export default class OrderRepository {
    placeOrder = async (userId, products, amount, address, quantity) => {
        console.log("hello from place order");
        try {
            const frontendUrl = "https://ecommshopes.netlify.app";
            const newOrder = new orderModel({
                userId: userId,
                products: products,
                amount: amount,
                address: address,    
            });
            await newOrder.save();
            const line_items = products.map((product) => ({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: product.productId.name
                    },
                    unit_amount: product.productId.new_price * 100
                },
                quantity: quantity
            }));

            line_items.push({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: 2 * 100
                },
                quantity: 1
            });
            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: "payment",
                client_reference_id: newOrder._id.toString(),
                success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
            });
            return session.url;
        } catch (err) {
            console.log(err);
        }
    }

    updateOrderStatus = async (orderId, isPaymentSuccess) => {
        try {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: isPaymentSuccess,
                status: isPaymentSuccess ? 'Paid' : 'Payment Failed'
            });
        } catch (err) {
            console.log(err);
        }
    }

    getOrderById = async (orderId) => {
        try {
            return await orderModel.findById(orderId);
        } catch (err) {
            console.log(err);
        }
    }

    getUserOrders = async (userId) => {
        try {
            const orders = await orderModel.find({ userId: new ObjectId(userId) })
                .populate({
                    path: 'userId',
                    model: 'Users', 
                    select: 'name email'
                })
                .populate({
                    path: 'products.productId',
                    model: 'Products'
                });
                return orders;
        } catch (err) {
            console.log(err);
        }
    } 
}