import React, { useEffect, useState } from "react";
import './RelatedProduct.css';
// import data_product from '../Assets/data';
import Item from "../Item/Item";
import { useParams } from "react-router-dom";

const RelatedProduct = ()=>{
    const [relatedProducts, setRelatedProducts] = useState([]);
    const {productId} = useParams();
    const getRelatedProducts = async (productId)=>{
        try{
            const response = await fetch(`https://ecommerceshops.onrender.com/api/products/relatedproduct/${productId}`);
            const data = await response.json();
            setRelatedProducts(data);
        } catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getRelatedProducts(productId);
    }, [productId]);

    return (
        <div className="relatedproducts">
            <h1>Related Product</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedProducts.map((item)=>{
                    return <Item key={item._id} id={item._id} name={item.name} image={item.imageUrl} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default RelatedProduct;