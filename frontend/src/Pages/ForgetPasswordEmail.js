import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginSignup.css'
const ForgetPasswordEmail = ()=>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleForgetPassword = async (e)=>{
        try{
            e.preventDefault();
            const response = await fetch("https://shoper-lvz1.onrender.com/api/users/forget-password",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                navigate('/forget-password-page');
            }
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1 style={{textAlign: "center"}}>SHOPPER</h1>
                <form method="POST" onSubmit={handleForgetPassword}>
                    <div className="loginsignup-fields">
                        <input value={formData.email} name="email" type="email" placeholder="Email Address" onChange={handleChange} />
                    </div>
                    <button type="submit">Continue</button>
                </form>
                <p className="loginsignup-login">
                    Don't have account? <span onClick={() => navigate('/signup')}>Sign up</span>
                </p>
            </div>
        </div>
    )
}

export default ForgetPasswordEmail;