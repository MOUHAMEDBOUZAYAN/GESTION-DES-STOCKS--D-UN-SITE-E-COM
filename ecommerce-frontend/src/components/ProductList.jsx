import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ products, fetchProducts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', price: '', stock: '' });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({ title: product.title, description: product.description, price: product.price, stock: product.stock });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData);
            fetchProducts();
            setEditingProduct(null); // Close modal after updating
        } catch (error) {
            console.error(error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">PRODUCTS LISTE</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <ul>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <li key={product._id} className="border p-2 mb-2 flex justify-between">
                            <div>
                                <h3 className="font-semibold">{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Price: {product.price} $</p>
                                <p>Stock: {product.stock}</p>
                            </div>
                            <div>
                                <button 
                                    onClick={() => handleEdit(product)} 
                                    className="bg-yellow-500 text-white p-1 mr-2 flex items-center transition duration-300 ease-in-out hover:bg-yellow-600"
                                >
                                    <FontAwesomeIcon icon={faEdit} className="mr-1" />
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(product._id)} 
                                    className="bg-red-500 text-white p-1 flex items-center transition duration-300 ease-in-out hover:bg-red-600"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </ul>

            {editingProduct && (
                <div className="mt-4 p-4 border">
                    <h3 className="font-semibold">Edit Product</h3>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="border p-2 mb-2 w-full"
                            required
                        />
                        <button type="submit" className="bg-blue-500 text-white p-1">Update Product</button>
                        <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white p-1 ml-2">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;