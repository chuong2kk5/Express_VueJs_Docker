const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/test', (req, res) => {
  res.json({ message: 'API hoạt động bình thường ✅' });
});

module.exports = router;
