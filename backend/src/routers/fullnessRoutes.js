// src/routers/fullnessRoutes.js
const express = require('express');
const { getFullnessData } = require('../controllers/fullnessController');

const router = express.Router();

router.get('/fullness', getFullnessData);

module.exports = router;
