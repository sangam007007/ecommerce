const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();
console.log("inside authroutes")
router.post('/login', login);

module.exports = router;
