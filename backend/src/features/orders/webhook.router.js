import express from 'express';
import bodyParser from 'body-parser';
import OrderController from './order.controller.js';
const router = express.Router();
const orderController = new OrderController();

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), orderController.handleStripeWebhook);

export default router; 
