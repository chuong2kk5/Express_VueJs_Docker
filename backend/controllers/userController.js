const User = require('../models/userModel');
const multer = require('multer');
const Minio = require('minio');
const bcrypt = require('bcrypt'); 


const minioClient = new Minio.Client({
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.upload = upload.single('avatar');  

function validateUserData(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || data.name.trim() === '') {
      errors.push('Không được để trống tên');
    }
  }

  if (!isUpdate || data.email !== undefined) {
    if (!data.email || data.email.trim() === '') {
      errors.push('Email là bắt buộc');
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.push('Vui lòng nhập địa chỉ email hợp lệ');
    }
  }

  if (!isUpdate || data.password !== undefined) {
    if (data.password && data.password.length < 6) {
      errors.push('Mật khẩu phải có ít nhất 6 kí tự');
    }
  }

  return errors;
}


// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET user by ID
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

   
    const hashedPassword = await bcrypt.hash(password, 10);

    let avatarUrl = null;

    if (req.file) {
      const bucketName = 'user-avatars';
      const fileName = Date.now() + '-' + req.file.originalname;

      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await minioClient.makeBucket(bucketName);
        console.log(`✅ Bucket "${bucketName}" đã được tạo`);
      }

      await minioClient.putObject(bucketName, fileName, req.file.buffer);
      avatarUrl = `http://localhost:9000/${bucketName}/${fileName}`;
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // dùng mật khẩu đã mã hóa
      avatar: avatarUrl,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// PUT update user
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

    const updates = { name, email };

    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      const bucketName = 'user-avatars';
      const fileName = Date.now() + '-' + req.file.originalname;

      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await minioClient.makeBucket(bucketName);
        console.log(`✅ Bucket "${bucketName}" đã được tạo`);
      }

      await minioClient.putObject(bucketName, fileName, req.file.buffer);
      updates.avatar = `http://localhost:9000/${bucketName}/${fileName}`;
    }

    const updatedUser = await User.update(req.params.id, updates);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
    console.log(req.body);
console.log(req.file);

  }
};

// DELETE user
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
