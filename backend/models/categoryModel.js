const { pool } = require('../config/db');

class Category {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM categories');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    }

    static async create({ name, slug }) {
        const [result] = await pool.query(
            'INSERT INTO categories (name, slug) VALUES (?, ?)',
            [name, slug]
        );
        return this.findById(result.insertId);
    }

    static async update(id, { name, slug }) {
        await pool.query(
            'UPDATE categories SET name = ?, slug = ? WHERE id = ?',
            [name, slug, id]
        );
        return this.findById(id);
    }

    static async delete(id) {
        await pool.query('DELETE FROM categories WHERE id = ?', [id]);
        return true;
    }
}

module.exports = Category;  