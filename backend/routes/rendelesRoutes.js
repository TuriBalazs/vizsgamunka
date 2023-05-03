const express = require('express');
const router = express.Router();
const { RendelesLead } = require('../controllers/rendelesController');

router.post('/', RendelesLead);

module.exports = router;