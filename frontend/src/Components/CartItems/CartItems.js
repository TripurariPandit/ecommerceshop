import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import { shopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png';
import cartImg from '../Assets/cartImg.png';
const CartItems = () => {
    const { getTotalCartAmount, cartItems, removeFromCart, addToCart, decreaseItemFromCart } = useContext(shopContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('auth-token');
    return (
        <div className="cartitems">
            {cartItems.length === 0 ? <div className="empty-cart-container">
                <div className="empty-cart">
                    <img src={cartImg} alt="" />
                    <h2>{token? 'Your cart is Empty!': 'Missing Cart items?'}</h2>
                    <p>{token? 'Add items to it now': 'Login to see the items you added previously'}</p>
                    <button onClick={() => token? navigate('/'):navigate('/login')}>{token? 'Shop Now': 'Login'}</button>
                </div>
            </div> : <>
                <div className="cartitems-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Size</p>
                    <p>Remove</p>
                </div>
                <hr />
                {cartItems.map((item) => {
                    return item.sizes.map(({size, quantity, _id}) => {
                        return <div key={_id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={`https://shoper-lvz1.onrender.com/uploads/${item.productId?.imageUrl}`} alt="" className="carticon-product-icon" />
                                <p>{item.productId?.name}</p>
                                <p>${item.productId?.new_price}</p>
                                <div className="cart-quantity-container" >
                                    <button className="decrease" onClick={() => { decreaseItemFromCart(item.productId._id, size) }}>
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <button className="cartitems-quantity">
                                        {quantity}
                                    </button>
                                    <button className="increase" onClick={() => { addToCart(item.productId._id, 1, size) }}>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                                <p>${item.productId?.new_price * quantity}</p>
                                <p>{size}</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(item._id, size) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    });
                })}
                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>${getTotalCartAmount()}</h3>
                            </div>
                        </div>
                        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="cartitems-promocode">
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cartitems-promobox">
                            <input type="text" placeholder="Promo code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default CartItems;