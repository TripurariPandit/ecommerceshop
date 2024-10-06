import React, { useEffect, useState } from 'react';
import './MyOrders.css';

/* My Orders component */
const MyOrders = ()=>{
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('auth-token');

    /* This function will give you all orders of a user */
    const getUserOrders = async ()=>{
        try{
            const response = await fetch('https://ecommerceshops.onrender.com/api/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            const data = await response.json();
            console.log(response);
            setOrders(data); 
            console.log(data);
        } catch(err){  
            console.log(err);
        }
    }

    useEffect(()=>{
        if(token){
            getUserOrders();
        }
    }, [token])
    return (
        <div className='my-orders'>
            <h2 style={{textAlign: 'center'}}>My Orders</h2>
            <div className='search-order'>
                <input type='text' placeholder='Search your orders here'/>
                <button>Search Orders</button>
            </div>
            <div className='container'>
                {orders.map((order)=>{
                    return (
                        <div key={order._id}>
                            {order.products.map((product, index)=>{
                                return(
                                    <div key={product.productId_id}>
                                        {product.sizes.map(({size, quantity}, index)=>{
                                            return(
                                                <div key={index} className='my-orders-order'>
                                                <img src={`https://ecommerceshops.onrender.com/${product.productId.imageUrl}`} alt='' />
                                                <div>
                                                    <p>{product.productId.name}</p>
                                                    <p>Size: {size} &nbsp; &nbsp; &nbsp;  Quantity: {quantity}</p>
                                                </div>
                                                <p>${order.amount}.00</p>
                                                <p><span>&#x25cf;</span><b> {order.status} </b></p>
                                                <button>Track Order</button> 
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MyOrders;