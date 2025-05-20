const { pool } = require('../config/db'); 
const bcrypt = require('bcrypt');

class User {
  static async findAll() {
    const [rows] = await pool.query('SELECT id, name, email, avatar, created_at FROM users');
    return rows;
  }

static async findById(id) {
  const [rows] = await pool.query('SELECT id, name, email, password, avatar, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
}

 
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create({ name, email, password, avatar }) {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)',
      [name, email, password, avatar]
    );
    return this.findById(result.insertId);
  }


static async update(id, { name, email, password, avatar }) {
  // Lấy thông tin cũ
  const user = await this.findById(id);

  const finalPassword = password || user.password; // password đã được hash nếu có, hoặc giữ password cũ
  const finalAvatar = avatar || user.avatar;

  await pool.query(
    'UPDATE users SET name = ?, email = ?, password = ?, avatar = ? WHERE id = ?',
    [name, email, finalPassword, finalAvatar, id]
  );

  return this.findById(id);
}


  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }
}

module.exports = User;
