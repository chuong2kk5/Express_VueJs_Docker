const { pool } = require('../config/db');
const { deleteFile } = require('../config/minio');

class Product {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ name, slug, description, price, image_url, category_id }) {
        const [result] = await pool.query(
            'INSERT INTO products (name, slug, description, price, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?)',
            [name, slug, description, price, image_url, category_id]
        );
        return this.findById(result.insertId);
    }

    static async update(id, { name, slug, description, price, image_url, category_id }) {
        const product = await this.findById(id);

        await pool.query(
            `UPDATE products 
             SET name = ?, slug = ?, description = ?, price = ?, image_url = ?, category_id = ? 
             WHERE id = ?`,
            [name, slug, description, price, image_url, category_id, id]
        );

        // Delete old image if it's different from new one
        if (product.image_url && product.image_url !== image_url) {
            try {
                await deleteFile(product.image_url);
            } catch (error) {
                console.error('Error deleting old image:', error);
            }
        }

        return this.findById(id);
    }

    static async delete(id) {
        const product = await this.findById(id);
        if (!product) return null;

        if (product.image_url) {
            try {
                await deleteFile(product.image_url);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }

        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        return product;
    }
}

module.exports = Product;
