import React, { useContext, useRef, useState, useEffect } from "react";
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { shopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png';
import dropdown from '../Assets/dropdown2.png';

/* Navbar Component */
const Navbar = () => {
    const [menu, setMenu] = useState("");
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {totalCartItem} = useContext(shopContext);
    const[isHovered, setIsHovered]= useState(false);
    const menuRef = useRef();

    /* This is menu setting function */
    useEffect(() => {
        if(pathname.includes("womens")){
            setMenu("womens");
        }
         else if (pathname.includes("mens")) {
            setMenu("mens");
        } else if (pathname.includes("kids")) {
            setMenu("kids");
        } else {
            setMenu("shop");
        }
    }, [pathname]);

    /* Toggle navbar */
    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    /* Logout function */
    const logout = ()=>{
        localStorage.removeItem('auth-token');
        window.location.replace('/');
    }

    return (
        <div className="navbars">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menus">
                <li ><Link to="/" style={{textDecoration: 'none'}}>Shop</Link> {menu === "shop" ? <hr /> : <></>} </li>
                <li ><Link to="/mens" style={{textDecoration: 'none'}}>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
                <li ><Link to="/womens" style={{textDecoration: 'none'}}>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
                <li ><Link to="/kids" style={{textDecoration: 'none'}}>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')?
                <div className="user-container">
                    <div className="user" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <i className="fa-solid fa-user"></i>
                        <span>{localStorage.getItem('name')}</span>
                        <img className={`dropdown ${isHovered ? 'rotate' : ''}`} src={dropdown} alt="" />
                    </div>
                    <div className={`user-profile ${isHovered ? 'user-profile-visible' : ''}`}>
                        <ul>
                            <li>
                                <i className="fa-solid fa-user"></i>
                                <span>My Profile</span>
                            </li>
                            <li onClick={()=> navigate('/orders')}>
                                <i className="fa-solid fa-cube"></i>
                                <span>Orders</span>
                            </li>
                            <li onClick={logout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <span>Logout</span>
                            </li>
                        </ul>
                    </div>
                </div>
                :<Link to="/login"><button>Login</button></Link>}
                <Link to="/cart"><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">
                    {totalCartItem()}   
                </div>
            </div>
        </div>
    );
}

export default Navbar;