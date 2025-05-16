const Product = require('../models/productModel');
const { uploadFile } = require('../config/minio');
const { uploadSingleImage } = require('../middlewares/uploadMiddleware');
const slugify = require('slugify');  
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    uploadSingleImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const { name, description, price, category_id } = req.body;
            let image_url = null;

            if (req.file) {
                image_url = await uploadFile(req.file);
            }

            const slug = slugify(name, { lower: true, strict: true });

            const product = await Product.create({
                name,
                slug,
                description,
                price,
                image_url,
                category_id: category_id || null
            });

            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

exports.updateProduct = async (req, res) => {
    uploadSingleImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const { name, description, price, category_id } = req.body;
            let image_url = null;

            if (req.file) {
                image_url = await uploadFile(req.file);
            }

            const existingProduct = await Product.findById(req.params.id);
            if (!existingProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const slug = slugify(name || existingProduct.name, { lower: true, strict: true });

            const updatedProduct = await Product.update(req.params.id, {
                name: name || existingProduct.name,
                slug,
                description: description || existingProduct.description,
                price: price || existingProduct.price,
                image_url: image_url || existingProduct.image_url,
                category_id: category_id || existingProduct.category_id
            });

            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.delete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
