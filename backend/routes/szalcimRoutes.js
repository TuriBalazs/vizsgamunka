const express = require('express');
const router = express.Router();
const { protect } = require('../mwares/authMiddleware');
const { szalcimFelvesz, getSzalCimek, szalPontok } = require('../controllers/szalcimController');

router.post('/felvesz', protect, szalcimFelvesz);
router.post('/szalpont', szalPontok);
router.get('/', getSzalCimek);


module.exports = router;