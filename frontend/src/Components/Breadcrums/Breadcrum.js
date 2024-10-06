import React from "react";
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';
import { useNavigate } from "react-router-dom";

const Breadcrum = (props)=>{
    const navigate = useNavigate();
    const {product} = props;
    return(
        <div className="breadcrum">
            <span onClick={()=> navigate('/')}>HOME</span> 
            <img src={arrow_icon} alt="" />
            <span onClick={()=> navigate('/')}>SHOP</span> 
            <img src={arrow_icon} alt="" /> 
            <span onClick={()=> navigate(`/${product.category}s`)}>{product.category}</span>
            <img src={arrow_icon} alt="" /> 
            <span>{product.name}</span>
        </div>
    )
}

export default Breadcrum;