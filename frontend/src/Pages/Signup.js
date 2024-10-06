import React from "react";
import './css/LoginSignup.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const signup = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch('https://ecommerceshops.onrender.com/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                await response.json();
                window.location.replace('/login');
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
                <h1 style={{textAlign: "center"}}>Sign Up</h1>
                <form method="POST" onSubmit={signup}>
                    <div className="loginsignup-fields">
                        <input name="name" value={formData.name} type="text" placeholder="Your Name" onChange={handleChange} required/>
                        <input name="email" value={formData.email} type="email" placeholder="Email Address" onChange={handleChange} required/>
                        <input name="password" value={formData.password} type="password" placeholder="Password" onChange={handleChange} required/>
                    </div>
                    <div className="loginsignup-agree">
                        <input type="checkbox" name="terms" id="" required />
                        <p>By continuing, i agree to the terms of use & privacy policy</p>
                    </div>
                    <button type="submit">Signup</button>
                </form>
                <p className="loginsignup-login">
                    Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
                </p>
            </div>
        </div>
    )
}

export default Signup;