import React, { useEffect, useState } from "react";
import './NewCollections.css';
// import new_collection from '../Assets/new_collections';
import Item from "../Item/Item";
const NewCollections = ()=>{
    const [newCollections, setNewCollections] = useState([]);
    const getNewCollections = async ()=>{
        try{
            const response = await fetch("https://shoper-lvz1.onrender.com/api/products/newcollections");
            const data = await response.json();
            setNewCollections(data);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getNewCollections();
    }, []);
    return(
        <div className="new-collections">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollections.map((item)=>{
                    return <Item key={item._id} id={item._id} name={item.name} image={item.imageUrl} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollections;