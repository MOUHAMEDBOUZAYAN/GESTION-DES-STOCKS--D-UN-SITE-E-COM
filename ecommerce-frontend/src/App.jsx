import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

import Navbar from './components/Navbar';

const App = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    return (
        <Router>
            <div className="w-full mx-auto">
                
            <Navbar/>
                <Routes>
                    <Route path="/" element={<ProductForm/>}/>
                    <Route path="/list" element={<ProductList/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;