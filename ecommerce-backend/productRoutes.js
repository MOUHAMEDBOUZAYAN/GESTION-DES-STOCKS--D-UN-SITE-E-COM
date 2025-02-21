const express = require('express');
const Product = require('./Product');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Dossier où les fichiers seront stockés
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec un timestamp
    },
});
const upload = multer({
    storage: storage // Limite de taille de fichier (5 Mo ici)
});


// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new product
router.post('/products', upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, stock } = req.body;
        const imagePath = req.file ? req.file.path : '';

        const newProduct = new Product({ title, description, price, stock, image: imagePath });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
});
// Update a product
router.put('/:id', async (req, res) => {
    const { title, description, price, stock, image } = req.body;
    const id = req.params.id; // Use req.params.id to get the id from the URL

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, price, stock, image },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;