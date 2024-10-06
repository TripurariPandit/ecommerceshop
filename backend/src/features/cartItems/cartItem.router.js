import express from 'express';
import CartItemsController from './cartItem.controller.js';

const router = express.Router();
const cartItemsController = new CartItemsController();

router.post('/decrease', cartItemsController.decreaseItemFromCart);

router.post('/', cartItemsController.addProductToCart);

router.get("/", cartItemsController.getProductFromCart);

router.delete("/:id", cartItemsController.deleteProductFromCart);

export default router;   