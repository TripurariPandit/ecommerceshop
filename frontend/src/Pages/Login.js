import React, { useContext, useState } from "react";
import './css/LoginSignup.css';
import { useNavigate } from "react-router-dom";
import { shopContext } from "../Context/ShopContext";
const Login = () => {
    const navigate = useNavigate();
    const { getCartItems } = useContext(shopContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const login = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch('https://ecommerceshops.onrender.com/api/users/signin', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('name', data.name);
                // window.location.replace('/'); 
                getCartItems();
                navigate('/');
            } else {
                alert("Invalid credinatials");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1 style={{textAlign: "center"}}>Login</h1>
                <form method="POST" onSubmit={login}>
                    <div className="loginsignup-fields">
                        <input value={formData.email} name="email" type="email" placeholder="Email Address" onChange={handleChange} />
                        <input value={formData.password} name="password" type="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    <div className="loginsignup-agree">
                        <input type="checkbox" name="terms" id="" required />
                        <p>By continuing, i agree to the terms of use & privacy policy</p>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className="loginsignup-login" style={{color: "blue", textDecoration:"underline", cursor: "pointer"}}
                onClick={()=> navigate('/forget-password')}>Forget password</p>
                <p className="loginsignup-login">
                    Don't have account? <span onClick={() => navigate('/signup')}>Sign up</span>
                </p>
            </div>
        </div>
    )
}

export default Login;