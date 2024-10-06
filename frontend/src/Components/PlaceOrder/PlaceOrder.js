import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { shopContext } from '../../Context/ShopContext';
const PlaceOrder = () => {
    const { getTotalCartAmount, cartItems, totalCartItem } = useContext(shopContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street:"",
        city:"",
        state:"",
        zipCode:"",
        country:"",
        phone:""
    });

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]: value}));
    }
    const placeOrder = async (event)=>{
        try{
            event.preventDefault();
            const token = localStorage.getItem('auth-token');
            const orderData = {
                address: data,
                products: cartItems,
                amount: getTotalCartAmount(),
                quantity: totalCartItem()
            }  
            const response = await fetch('https://ecommerceshops.onrender.com/api/orders/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(orderData)
            }); 
            const sessionUrl = await response.json();
            window.location.replace(sessionUrl);
            console.log(sessionUrl);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className='order'>
            <form className='place-order' onSubmit={placeOrder}>
                <div className='place-order-left'>
                    <h1 className='title'>Delivery Information</h1>
                    <div className='multi-fields'>
                        <input type='text' name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First Name' required/>
                        <input type='text' name='lastName' value={data.lastName} onChange={onChangeHandler}  placeholder='Last Name' required/>
                    </div>
                    <input type='email' name='email' value={data.email} onChange={onChangeHandler} placeholder='Email address' required/>
                    <input type='text' name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' required/>
                    <div className='multi-fields'>
                        <input type='text' name='city' value={data.city} onChange={onChangeHandler} placeholder='City' required/>
                        <input type='text' name='state' value={data.state} onChange={onChangeHandler} placeholder='State' required/>
                    </div>
                    <div className='multi-fields'>
                        <input type='text' name='zipCode' value={data.zipCode} onChange={onChangeHandler}  placeholder='Zip Code' required/>
                        <input type='text' name='country' value={data.country} onChange={onChangeHandler}  placeholder='Country' required/>
                    </div>
                    <input type='phone' name='phone' value={data.phone} onChange={onChangeHandler} placeholder='Phone' required/>
                </div>
                <div className='place-order-right'>
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
                        <button type='submit'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder;