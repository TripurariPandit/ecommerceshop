import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
export const shopContext = createContext();

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [all_product, setAll_product] = useState([]);

    const getAllProducts = async () => { 
        try {
            const response = await fetch('https://ecommerceshops.onrender.com/api/products');
            const data = await response.json();
            setAll_product(data);
        } catch (err) {
            console.log(err);
        }
    }

    const getCartItems = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) return
            const response = await fetch('https://ecommerceshops.onrender.com/api/cartitems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            setCartItems(data);
        } catch (err) {
            console.log(err);
        }
    }

    const isTokenExpired = (token) => {
        if (!token) return;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            const token = localStorage.getItem('auth-token');
            if (isTokenExpired(token)) {
                localStorage.removeItem('auth-token');
            }
        }
    }, []);

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        getAllProducts();
    }, []);

    const addToCart = async (productId, quantity, size) => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                window.location.replace('/login');
                return;
            }
            const response = await fetch('https://ecommerceshops.onrender.com/api/cartitems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    productId,
                    quantity,
                    size
                })
            });
            await response.text();
            getCartItems();
        } catch (err) {
            console.log(err);
        }
    }

    const decreaseItemFromCart = async (productId, size) => {
        try{
            const token = localStorage.getItem('auth-token');
            if (!token) {
                window.location.replace('/login');
                return;
            }
            const response = await fetch('https://ecommerceshops.onrender.com/api/cartitems/decrease', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    productId,
                    size
                })
            });
            await response.text();
            getCartItems();
        } catch(err){
            console.log(err);
        }
    }

    const removeFromCart = async (cartItemId, size) => {
        try {
            const token = localStorage.getItem('auth-token');
            await fetch(`https://ecommerceshops.onrender.com/api/cartitems/${cartItemId}?size=${size}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            getCartItems();
        } catch (err) {
            console.log(err);
        }
    };

    const getTotalCartAmount = () => {
        return cartItems.reduce((total, items) => {
            return total + items.sizes.reduce((sum, item)=>{
                return sum + (item.quantity * items.productId?.new_price);
            }, 0)
        }, 0);
    };

    const totalCartItem = () => {
        return cartItems.reduce((total, items) => {
            return total + items.sizes.reduce((sum, item)=> {
                return sum + item.quantity;
            }, 0);
        }, 0);
    }

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, totalCartItem, getCartItems, decreaseItemFromCart };
    return (
        <shopContext.Provider value={contextValue}>
            {props.children}
        </shopContext.Provider>
    )
}

export default ShopContextProvider;