import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginSignup.css'
const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        cnfNewPassword: "",
        token: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const resetPassword = async (e) => {
        try {
            e.preventDefault();
            if (formData.newPassword !== formData.cnfNewPassword) {
                alert("passord should be match");
                return;
            }
            const response = await fetch('https://ecommerceshops.onrender.com/api/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword: formData.newPassword, token: formData.token })
            });
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                navigate('/login');
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
                <h1 style={{ textAlign: "center" }}>Reset account password</h1>
                <form method="POST" onSubmit={resetPassword}>
                    <div className="loginsignup-fields">
                        <input value={formData.newPassword} name="newPassword" type="password"
                            placeholder="New password" onChange={handleChange} />
                        <input value={formData.cnfNewPassword} name="cnfNewPassword"
                            type="password" placeholder="Password" onChange={handleChange} />
                        <input value={formData.token} name="token"
                            type="text" placeholder="Token" onChange={handleChange} />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword;