const express = require('express');
const router = express.Router();
const { keszletFelvesz, getKeszlet, deleteKeszlet } = require('../controllers/keszletController');

router.get('/', getKeszlet)
router.post('/add', keszletFelvesz);
router.delete('/delete', deleteKeszlet)

module.exports = router;