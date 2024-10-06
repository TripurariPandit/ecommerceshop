import { useState } from 'react';
import './css/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        cnfNewPassword: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const resetPassword = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('auth-token');
            if (!token) {
                alert("Token not found, please login again.");
                return;
            }
            if (formData.newPassword !== formData.cnfNewPassword) {
                alert("passord should be match");
                return;
            }
            const response = await fetch('https://ecommerceshops.onrender.com/users/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ newPassword: formData.newPassword })
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
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;