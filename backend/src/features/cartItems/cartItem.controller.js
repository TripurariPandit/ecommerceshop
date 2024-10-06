import CartItemsRepository from "./cartItem.repository.js";

export default class CartItemsController{
    constructor(){
        this.cartItemsRepository = new CartItemsRepository();
    }

    addProductToCart = async (req, res)=>{
        try{
            const {productId, quantity, size} = req.body;
            const userId = req.userId;
            const error = await this.cartItemsRepository.addProductToCart(userId, productId, quantity, size);
            if(error){
                return res.status(404).send(error);
            }
            return res.status(200).send("Items added in cart");
        } catch(err){
            console.log(err);  
        }
    }

    getProductFromCart = async (req, res)=>{
        try{
            const userId = req.userId;
            const cartItems = await this.cartItemsRepository.getProductFromCart(userId);
            return res.status(200).send(cartItems);
        } catch(err){
            console.log(err);
        }
    }

    deleteProductFromCart = async (req, res)=>{
        try{
            const userId = req.userId;
            const cartItemId = req.params.id;
            const size = req.query.size;
            await this.cartItemsRepository.deleteProductFromCart(userId, cartItemId, size);
            return res.status(200).send('Cart item is removed');
        } catch(err){
            console.log(err);
        }
    }

    decreaseItemFromCart = async (req, res)=>{
        try{
            const {productId, size} = req.body;
            const userId = req.userId;
            const error = await this.cartItemsRepository.decreaseItemFromCart(userId, productId, size);
            if(error){
                return res.status(404).send(error);
            }
            return res.status(200).send("One quantity is removed from cart");
        } catch(err){
            console.log(err);  
        }
    }
}