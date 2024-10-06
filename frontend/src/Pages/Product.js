import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import DescriptionBox from "../Components/DescriptionBox/DesciptionBox";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import RelatedProduct from "../Components/RelatedProduct/RelatedProduct";
const Product = ()=>{
    const {productId} = useParams();
    const [product, setProduct] = useState({});
    const getProductById = async (productId)=>{
        try{
            const response = await fetch(`https://shoper-lvz1.onrender.com/api/products/${productId}`);
            const data = await response.json();
            setProduct(data);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getProductById(productId);
    }, [productId]);
    return(
        <>
            <Breadcrum product={product} />
            <ProductDisplay product={product}/>
            <DescriptionBox />
            <RelatedProduct />
        </>
    )
}

export default Product;