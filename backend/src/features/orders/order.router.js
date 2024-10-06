import express from 'express';
import OrderController from './order.controller.js';
const router = express.Router();
const orderController = new OrderController();

router.post('/placeorder', orderController.placeOrder);
// router.post('/webhook', bodyParser.raw({ type: 'application/json' }), orderController.handleStripeWebhook);
router.post("/verify-payment", orderController.verifyPayment);
router.get('/', orderController.getUserOrders);

export default router;     