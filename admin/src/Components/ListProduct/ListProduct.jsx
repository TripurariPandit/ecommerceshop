import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const fetchData = async () => {
        try{
            const response = await fetch('https://ecommerceshops.onrender.com/api/products');
            const data = await response.json();
            setAllProducts(data);
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const removeProduct = async (id)=>{
        try{
            const response = await fetch(`https://ecommerceshops.onrender.com/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                fetchData();
            } else {
                console.error('Failed to delete product');
            }
        } catch(err){
            console.log("Error: ", err);
        }
    }
    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <table className='listproduct-table'>
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Title</th>
                        <th>Old Price</th>
                        <th>New Price</th>
                        <th>Category</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map((product) => (
                        <tr key={product._id}>
                            <td><img src={`https://ecommerceshops.onrender.com/uploads/${product.imageUrl}`} alt='' className='listproduct-product-icon' /></td>
                            <td>{product.name}</td>
                            <td>{product.old_price}</td>
                            <td>{product.new_price}</td>
                            <td>{product.category}</td>
                            <td><img src={cross_icon} alt=''  onClick={()=>removeProduct(product._id)}    className='listproduct-remove-icon' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default ListProduct;