import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({ title: '', description: '', price: 0, stock: 0 });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("stock", product.stock);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Assuming onSubmit is a prop function passed to this component
            onSubmit(response.data.product);
            setProduct({ title: "", description: "", price: 0, stock: 0 });
            setImage(null);
        } catch (error) {
            setError("Error adding product: " + (error.response ? error.response.data.message : error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-700 min-h-screen flex items-center justify-center">
            <div className="max-w-md p-6 bg-gray-800 shadow-xl rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-white text-center">Add New Product</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Product Title" 
                        value={product.title} 
                        onChange={handleChange} 
                        required 
                        className="border border-gray-600 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white" 
                    />
                    <textarea 
                        name="description" 
                        placeholder="Product Description" 
                        value={product.description} 
                        onChange={handleChange} 
                        required 
                        className="border border-gray-600 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white" 
                    />
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="Price ($)" 
                        value={product.price} 
                        onChange={handleChange} 
                        required 
                        className="border border-gray-600 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white" 
                    />
                    <input 
                        type="number" 
                        name="stock" 
                        placeholder="Stock Quantity" 
                        value={product.stock} 
                        onChange={handleChange} 
                        required 
                        className="border border-gray-600 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white" 
                    />
                    <div className="border border-gray-600 p-4 rounded-md bg-gray-700">
                        <label className="block font-medium text-gray-300">Upload Image</label>
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            className="mt-2" 
                        />
                    </div>
                    {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mt-2 h-32 w-32 object-cover" />}
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold py-2 rounded-md shadow-lg hover:bg-blue-700 transition duration-200`}>
                        {loading ? 'Adding...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;