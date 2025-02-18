import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ fetchProducts }) => {
    const [product, setProduct] = useState({ title: '', description: '', price: 0, stock: 0, image: '' });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', product);
            fetchProducts();
            setProduct({ title: '', description: '', price: 0, stock: 0, image: '' }); // Reset form
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required className="border p-2 w-full" />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} required className="border p-2 w-full mt-2" />
            <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required className="border p-2 w-full mt-2" />
            <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required className="border p-2 w-full mt-2" />
            <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required className="border p-2 w-full mt-2" />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Add Product</button>
        </form>
    );
};

export default ProductForm;

