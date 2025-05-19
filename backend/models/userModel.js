const { pool } = require('../config/db'); 

class User {
  static async findAll() {
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create({ name, email, password }) {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return this.findById(result.insertId);
  }

  static async update(id, { name, email, password }) {
    await pool.query(
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
      [name, email, password, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }
}

module.exports = User;
