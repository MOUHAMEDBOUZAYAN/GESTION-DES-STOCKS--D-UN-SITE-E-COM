import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-center font-bold mb-4">PRODUCT MANAGMENT</h1>
            <ProductForm fetchProducts={fetchProducts} />
            <ProductList products={products} fetchProducts={fetchProducts} />
        </div>
    );
};

export default App;