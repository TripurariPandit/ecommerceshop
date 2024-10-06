import React, { useState } from 'react'
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        imageUrl: "",
        category: "women",
        new_price: "",
        old_price: "",
        sizes: [],
    });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
        if (e.target.files) setImage(e.target.files[0]);
    }

    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        let updatedSizes = [...productDetails.sizes];
        
        if (checked) {
            updatedSizes.push(value);
        } else {
            updatedSizes = updatedSizes.filter(size => size !== value);
        }

        setProductDetails({
            ...productDetails,
            sizes: updatedSizes
        });
        console.log(productDetails);
    };

    const AddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productDetails.name);
        formData.append('old_price', productDetails.old_price);
        formData.append('new_price', productDetails.new_price);
        formData.append('category', productDetails.category);
        formData.append('imageUrl', image);
        console.log(formData)
        formData.append('sizes', productDetails.sizes);
        

        const res = await fetch("http://localhost:4000/api/products", {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        data ? alert("product added successfully") : alert("something went wrong");
        console.log(data);
        setProductDetails({
            name: "",
            imageUrl: "",
            category: "women",
            new_price: "",
            old_price: "",
            sizes:[]
        });
        setImage(false);
    };

    return (
        <div className='add-product'>
            <form method='POST' encType='multipart/form-data' onSubmit={AddProduct}>
                <div className='addproduct-itemfield'>
                    <label>Product title</label>
                    <input className='inputfield' value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
                </div>
                <div className='addproduct-price'>
                    <div className='addproduct-itemfield'>
                        <label>Price</label>
                        <input className='inputfield' value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
                    </div>
                    <div className='addproduct-itemfield'>
                        <label>Offer Price</label>
                        <input className='inputfield' value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
                    </div>
                </div>
                <div className='addproduct-itemfield'>
                    <label>Product Category</label><br></br>
                    <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                        <option value='women'>Women</option>
                        <option value='men'>Men</option>
                        <option value='kid'>Kid</option>
                    </select>
                </div>
                <div className='addproduct-itemfield'>
                    <label>Product Sizes</label><br></br>
                    <div className='sizes'>
                        <label>
                            <input type="checkbox" name='sizes' value="XS" 
                            checked={productDetails.sizes.includes('XS')} 
                            onChange={handleSizeChange}/>XS
                        </label>
                        <label>
                            <input type="checkbox" name='sizes' value="S" 
                            checked={productDetails.sizes.includes('S')} 
                            onChange={handleSizeChange}/>S
                        </label>
                        <label>
                            <input type="checkbox" name='sizes' 
                            value="M" 
                            checked={productDetails.sizes.includes('M')} 
                            onChange={handleSizeChange}/>M
                        </label>
                        
                        <label>
                            <input type="checkbox" name='sizes' 
                            value="L" 
                            checked={productDetails.sizes.includes('L')} 
                            onChange={handleSizeChange}/>L
                        </label>
                        <label>
                            <input type="checkbox" name='sizes' 
                            value="XL" 
                            checked={productDetails.sizes.includes('XL')} 
                            onChange={handleSizeChange}/>XL
                        </label>
                    </div>
                </div>
                <div className='addproduct-itemfield'>
                    <label htmlFor='file-input'>
                        <img src={image ? URL.createObjectURL(image) :
                            upload_area} className='addproduct-thumnail-img' alt='' />
                    </label>
                    <input onChange={changeHandler} type='file' name='imageUrl' id='file-input' hidden />
                </div>
                <button type='submit' className='addproduct-btn'>ADD</button>
            </form>
        </div>
    )
}

export default AddProduct;