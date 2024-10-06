import React, { useEffect, useState } from "react";
import './Popular.css';
import Item from "../Item/Item";
const Popular = ()=>{
    const [popularInWomen, setPopularInWomen] = useState([]);
    const getPopularInWomen = async ()=>{
        try{
            const response = await fetch('https://ecommerceshops.onrender.com/api/products/popularinwomen');
            const data = await response.json();
            setPopularInWomen(data);
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getPopularInWomen();
    }, []);

    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularInWomen.map((item)=>{
                    return <Item key={item._id} id={item._id} name={item.name} image={item.imageUrl} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular;