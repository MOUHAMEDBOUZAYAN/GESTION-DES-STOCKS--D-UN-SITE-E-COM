import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="w-full mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">PRODUCT MANAGMENT</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white hover:bg-gray-700 p-2 rounded">Add Product</Link>
                    </li>
                    <li>
                        <Link to="/list" className="text-white hover:bg-gray-700 p-2 rounded">View Products</Link>
                    </li>
                    <li>
                        <Link to="/help" className="text-white hover:bg-gray-700 p-2 rounded">Help</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;