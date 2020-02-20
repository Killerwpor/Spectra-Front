// Requires
const express = require('express');
const router = express.Router();

// Models
const modelController = require('../controllers/project-controller');

////////////////////API////////////////////

// CREATE
router.post('/create', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.create(data)
  res.status(200).json({
    result
  });
});

// READ
router.post('/read', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.read(data)
  res.status(200).json({
    result
  });
});

// UPDATE
router.put('/update', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.update(data)
  res.status(200).json({
    result
  });
})

// DELETE
router.delete('/deleteById', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteById(data)
  res.status(200).json({
    result
  });
});

// LIST
router.get('/', async function(req, res){
  let result = await modelController.list()
  res.status(200).json({
    result
  });
})

// DEBUG: DELETE ALL
router.delete('/deleteAll', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteAll(data)
  res.status(200).json({
    result
  });
});

/// FUNCTIONS

// ADD PROJECT TO COMPANY
router.post('/addProject',async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.assignEmployee(data)
  res.status(200).json({
    result
  });
})

// APPEND EMPLOYEE
router.post('/assignEmployee', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.assignEmployee(data)
  res.status(200).json({
    result
  });
})

// READ EMPLOYEE
router.post('/readEmployee', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readEmployee(data)
  res.status(200).json({
    result
  })
})

// LIST EMPLOYEE
router.post('/listEmployees', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.listEmployees(data)
  res.status(200).json({
    result
  })
})

// DELETE EMPLOYEE
router.delete('/deleteEmployee', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteEmployee(data)
  res.status(200).json({
    result
  })
})

// APPEND INSTRUCTOR
router.post('/assignInstructor', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.assignInstructor(data)
  res.status(200).json({
    result
  });
})

// READ INSTRUCTOR
router.post('/readInstructor', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readInstructor(data)
  res.status(200).json({
    result
  })
})

// LIST INSTRUCTOR
router.post('/listInstructors', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.listInstructors(data)
  res.status(200).json({
    result
  })
})

// DELETE INSTRUCTOR
router.delete('/deleteInstructor', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteInstructor(data)
  res.status(200).json({
    result
  })
})

// APPEND COMPANY ADMIN
router.post('/assignAdmin', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.assignAdmin(data)
  res.status(200).json({
    result
  });
})

// READ COMPANY ADMIN
router.post('/readAdmin', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readAdmin(data)
  res.status(200).json({
    result
  })
})

// LIST COMPANY ADMIN
router.post('/listAdmins', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.listAdmins(data)
  res.status(200).json({
    result
  })
})

// DELETE COMPANY ADMIN
router.delete('/deleteAdmin', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteAdmin(data)
  res.status(200).json({
    result
  })
})

// APPEND METRICS
router.post('/assignMetric', async function(req,res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.assignMetric(data)
  res.status(200).json({
    result
  });
})

// READ METRICS
router.post('/readMetric', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readMetric(data)
  res.status(200).json({
    result
  })
})

// LIST METRICS
router.post('/listMetrics', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.listMetrics(data)
  res.status(200).json({
    result
  })
})

// DELETE METRICS
router.delete('/deleteMetric', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteMetric(data)
  res.status(200).json({
    result
  })
})

module.exports = router;
