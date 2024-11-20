const express = require('express');
const { getReport } = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');

const router = express.Router();
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
router.post('/report', authenticateToken, getReport);

router.post('/report/campaign', authenticateToken,productController.getProductReport);

// API 2: Get product stats filtered by Ad Group ID
router.post('/report/adGroupID', authenticateToken,productController.getProductReport);

// API 3: Get product stats filtered by FSN ID
router.post('/report/fsnID',authenticateToken, productController.getProductReport);

// API 4: Get product stats filtered by Product Name
router.post('/report/productName',authenticateToken, productController.getProductReport);


module.exports = router;
