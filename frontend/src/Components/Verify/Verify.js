import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Verify = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('auth-token');
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const verifyPayment = async ()=>{
        try {
            const response = await fetch('https://ecommerceshops.onrender.com/api/orders/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ orderId }),
            });
            const data = await response.json();
            if(data.isPaid){
                navigate("/orders");
            } else{
                navigate('/');
            }
        } catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className='spinner'>

            </div>
        </div>
    )
}

export default Verify;