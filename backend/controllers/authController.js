const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || '8ad0d6735c7a9ff3a2519dcd99990537c55ae7d42a5be2c54fe594e3d1df56a86a4c1ec1090f334ecfee71491c437e10d42ab843506a1a2f55a8bafe6fa245c1a04bce475ff1f48f9668705ee3fbc0e6221e0f22978b1a30ecc8e55e19af710134d71225bcb51451a73a3156d383a153cb13dbfaf8860c4ae7ac9fdd4a3946d92a0ad46d3613261697b8c220235d4ecfddb62749030364bbb28e03008c2f0bd213ec341b0ea5e6d77007b4558d2ca1f2a8b8d246c4d7777472578d430a7ab42e66b57557df85f6d636c166f84e76f8c0fecdba4ad84d125666986fa233a9beda76e84b520e86adecc201213672cc711dce94e6d2c5e0629523c795935a4e4685';

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ tên, email và mật khẩu' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email đã tồn tại' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Đăng ký thành công', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập email và mật khẩu' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Email không tồn tại' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Mật khẩu không chính xác' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Đăng nhập thành công', token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
