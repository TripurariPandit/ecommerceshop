import Stripe from 'stripe';
import twilio from 'twilio';
import OrderRepository from "./order.repository.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository(); 
    }

    placeOrder = async (req, res)=>{
        try{
            const userId = req.userId;
            const {products, amount, address, quantity} = req.body;
            const sessionUrl = await this.orderRepository.placeOrder(userId, products, amount, address, quantity);
            return res.status(200).send(JSON.stringify(sessionUrl));
        }catch(err){
            console.log(err);
        }
    }

    handleStripeWebhook = async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body, 
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log(err);
        }
        console.log("event", event);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object; 
            // console.log(session)
            await this.orderRepository.updateOrderStatus(session.client_reference_id, true);
            // const phoneNumber = session.customer_details.phone; // Extract phone number
            const phoneNumber = 9304598147;
            // if (phoneNumber) {
            //     await sendSms(phoneNumber);
            // }
        }

        if (event.type === 'checkout.session.expired') {
            const session = event.data.object;
            await this.orderRepository.updateOrderStatus(session.client_reference_id, false);
        }
        res.json({ received: true });
    };

    verifyPayment = async (req, res)=>{
        try{
            const {orderId} = req.body;
            console.log(orderId);
            const order = await this.orderRepository.getOrderById(orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            const isPaid = order.payment;
            return res.status(200).json({ isPaid });
        } catch(err){
            console.log(err);
        }
    }

    getUserOrders = async (req, res)=>{
        try{
            const userId = req.userId;
            const orders = await this.orderRepository.getUserOrders(userId);
            return res.status(200).send(orders);
        } catch(err){
            console.log(err);
        }
    }

    sendSms = async (phoneNumber) => {
        try {
            await twilioClient.messages.create({
                body: 'Your payment was successful. Thank you for your order!',
                from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
                to: phoneNumber
            });
            console.log('SMS sent successfully');
        } catch (error) {
            console.log('Error sending SMS:', error);
        }
    };
}