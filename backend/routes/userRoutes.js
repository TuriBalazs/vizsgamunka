const express = require('express');
const router = express.Router();
const { protect } = require('../mwares/authMiddleware');
const { register, login, getUser, modifyUser, registerAdmin } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/', protect, getUser);
router.post('/adatmodositas', protect, modifyUser);
router.post('/registerAdmin', registerAdmin);


module.exports = router;