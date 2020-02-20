//Requires
const express = require('express');
const router = express.Router();

//Models
const modelController = require('../controllers/metric-controller');

////////////////////API////////////////////

// CREATE:
router.post('/', modelController.capture);

// READ:
router.post('/get', modelController.getMetric);

// READ:
router.post('/getById', modelController.getMetricById);

// DELETE:
router.delete('/delete', modelController.cleanAll);

module.exports = router;
