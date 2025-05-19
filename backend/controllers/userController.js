const User = require('../models/userModel');

function validateUserData(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || data.name.trim() === '') {
      errors.push('Không được để trống tên');
    }
  }

  if (!isUpdate || data.email !== undefined) {
    if (!data.email || data.email.trim() === '') {
      errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Vui lòng nhập địa chỉ email hợp lệ');
    }
  }

  if (!isUpdate || data.password !== undefined) {
    if (!data.password || data.password.length < 6) {
      errors.push('Mật khẩu phải có ít nhất 6 kí tự');
    }
  }

  return errors;
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const errors = validateUserData({ name, email, password });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email đã được đăng ký' });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const errors = validateUserData({ name, email, password }, true);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    const updatedUser = await User.update(req.params.id, { name, email, password });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    await User.delete(req.params.id);
    res.json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
