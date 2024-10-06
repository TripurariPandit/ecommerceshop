import React, { useEffect, useState } from "react";
import './css/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from "../Components/Item/Item";
const ShopCategory = (props) => {
    const [products, setProducts] = useState([]);
    const { banner, category } = props;

    const getProductByCategory = async (category) => {
        try {
            const response = await fetch(`https://shoper-lvz1.onrender.com/api/products/category?category=${category}`);
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProductByCategory(category);
    }, [category]);

    return (
        <div className="shop-category">
            <img className="shopcategory-banner" src={banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {products.map((item) => {
                    return <Item key={item._id} id={item._id} name={item.name} image={item.imageUrl} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory;