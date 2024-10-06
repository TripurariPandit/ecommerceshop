import React, { useContext, useState } from "react";
import './ProductDisplay.css';
import start_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { shopContext } from "../../Context/ShopContext";
import { useParams } from "react-router-dom";

const ProductDisplay = (props) => {
    const {addToCart} = useContext(shopContext);
    const {productId} = useParams();
    const [size, setSize] = useState('S');
    const {imageUrl, name, old_price, new_price, sizes } = props.product;
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={`https://shoper-lvz1.onrender.com/uploads/${imageUrl}`} alt="" />
                    <img src={`https://shoper-lvz1.onrender.com/uploads/${imageUrl}`} alt="" />
                    <img src={`https://shoper-lvz1.onrender.com/uploads/${imageUrl}`} alt="" />
                    <img src={`https://shoper-lvz1.onrender.com/uploads/${imageUrl}`} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={`https://shoper-lvz1.onrender.com/uploads/${imageUrl}`} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={start_icon} alt="" />
                    <img src={start_icon} alt="" />
                    <img src={start_icon} alt="" />
                    <img src={start_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted, pullover shirt, close-fitting
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {sizes?.map((s, index)=>{
                            return <div key={index} onClick={()=> setSize(s.size)} className={size === s.size ? 'active' : ''}>
                                {s.size}
                            </div>
                        })}
                    </div>
                </div>
                <button onClick={()=> {addToCart(productId, 1, size)}}>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    <span>Category :</span> Women, T-shirt, Crop Top
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags :</span> Modern, Latest
                </p>
            </div>
        </div>
    );
}

export default ProductDisplay;