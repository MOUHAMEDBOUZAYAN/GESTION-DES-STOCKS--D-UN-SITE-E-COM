import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ProductList = ({ products, fetchProducts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    // Filter products based on search term
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
                            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-1 flex items-center">
                                <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </ul>
        </div>
    );
};

export default ProductList;