import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { cartSchema } from "./cartItem.schema.js";
import { userSchema } from "../users/user.schema.js";
import { productSchema } from "../products/product.schema.js";
const cartItemsModel = mongoose.model('CartItems', cartSchema);
const userModel = mongoose.model('Users', userSchema);
const productModel = mongoose.model('Products', productSchema);

export default class CartItemsRepository {

    async addProductToCart(userId, productId, quantity, size) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return "User not found";
            }
            const product = await productModel.findById(productId);
            if (!product) {
                return "Product not found";
            }

            const prod = await productModel.findOne({ 'sizes.size': size }, {
                sizes: { $elemMatch: { size: size } }
            });
            if (prod.sizes[0].quantity === 0) {
                return "Out of Stock";
            }

            const cartItems = await cartItemsModel.findOne({productId: new ObjectId(productId)});
            if(!cartItems){
                const newCartItems = new cartItemsModel({
                    productId: new ObjectId(productId),
                    userId: new ObjectId(userId), 
                    sizes:[{size, quantity}]
                }); 
                await newCartItems.save();
            } else{
                const updatedCartItem = await cartItemsModel.updateOne({productId: new ObjectId(productId), 'sizes.size': size }, {
                    $inc: {
                        'sizes.$.quantity': quantity
                    }
                });
                if (updatedCartItem.matchedCount === 0) {
                    await cartItemsModel.updateOne({ productId: new ObjectId(productId) }, {
                            $push: { sizes: { size: size, quantity: quantity } }
                        }
                    );
                }
            }

            await productModel.updateOne({ _id: new ObjectId(productId), 'sizes.size': size }, {
                $inc: {
                    'sizes.$.quantity': -quantity
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async getProductFromCart(userId) {
        try {
            const cartItems = await cartItemsModel.find({ userId: new ObjectId(userId) }).populate('productId');
            return cartItems;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteProductFromCart(userId, cartItemId, size) {
        try {
            const cartItem = await cartItemsModel.findOne({_id: new ObjectId(cartItemId), userId: new ObjectId(userId), 'sizes.size': size});
            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            if (cartItem.sizes.length === 1 && cartItem.sizes[0].size === size) {
                const result = await cartItemsModel.deleteOne({ _id: new ObjectId(cartItemId), userId: new ObjectId(userId) });
                return result.deletedCount > 0;
            } else {
                await cartItemsModel.updateOne({  _id: new ObjectId(cartItemId), userId: new ObjectId(userId) },{
                    $pull: { 
                        sizes: { size } 
                    } 
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async decreaseItemFromCart(userId, productId, size) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                return "User not found";
            }
            const product = await productModel.findById(productId);
            if (!product) {
                return "Product not found";
            }
            const cartItem = await cartItemsModel.findOne({
                userId: new ObjectId(userId),
                productId: new ObjectId(productId),
                'sizes.size': size
            });
            if (!cartItem) {
                return "Item not found in cart";
            }
            const sizeObj = cartItem.sizes.find(s => s.size === size);
            if (sizeObj.quantity > 1) {
                await cartItemsModel.updateOne({ userId: new ObjectId(userId), productId: new ObjectId(productId), 'sizes.size': size }, { 
                    $inc: { 
                        'sizes.$.quantity': -1
                    } 
                });
            } else {
                if(cartItem.sizes.length > 1){
                    await cartItemsModel.updateOne({ userId: new ObjectId(userId), productId: new ObjectId(productId) }, {
                        $pull: { 
                            sizes: { size: size } 
                        } 
                    });
                } else{
                    await cartItemsModel.deleteOne({ userId: new ObjectId(userId), productId: new ObjectId(productId)});
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}