import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


const ProductList = ({ fetchProducts }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        stock: '', 
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleDelete = async (_id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/api/${_id}`);
                fetchProducts(); // Refresh the product list
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/${editingProduct._id}`, formData);
            fetchProducts(); // Refresh the product list
            setSuccessMessage('Product updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            setEditingProduct(null); // Close modal after updating
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6" id='list'>
            <h1 className="text-2xl font-bold mb-4 text-center">Products List</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {successMessage && (
                <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
                    {successMessage}
                </div>
            )}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4 text-left">Image</th>
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Description</th>
                        <th className="py-2 px-4 text-left">Price</th>
                        <th className="py-2 px-4 text-left">Stock</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <tr key={product._id} className="border-b">
                                <td className="py-2 px-4">
                                    {product.image && (
                                        <img src={`http://localhost:5000/${product.image}`} alt={product.title} className="w-16 h-16 object-cover" />
                                    )}
                                </td>
                                <td className="py-2 px-4">{product.title}</td>
                                <td className="py-2 px-4">{product.description}</td>
                                <td className="py-2 px-4">${product.price}</td>
                                <td className="py-2 px-4">{product.stock}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <button 
                                        onClick={() => handleEdit(product)} 
                                        className="bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600 transition"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product._id)} 
                                        className="bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 transition"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {editingProduct && (
                <div className="mt-4 p-4 border rounded-md shadow">
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
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Update Product</button>
                        <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white p-2 rounded-md ml-2">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductList;