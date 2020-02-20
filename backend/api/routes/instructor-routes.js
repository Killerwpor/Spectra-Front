// Requires
const express = require('express');
const router = express.Router();
const validator = require('validator');

// Models
const modelController = require('../controllers/instructor-controller');

////////////////////API////////////////////

// CREATE
router.post('/create', async function(req, res){
  let data = JSON.parse(req.body.data)
  if(validator.isEmail(data.email)){
    let result = await modelController.create(data)
    res.status(200).json({
      result
    });
  } else {
    res.status(500).json({
      Message: "Error: Formato de email invalido"
    })
  }
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

// CREATE EMPLOYEE
router.post('/createEmployee', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.createEmployee(data)
  res.status(200).json({
    result
  });
})

// READ EMPLOYEE
router.post('/readEmployee', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readEmployee(data)
  res.status(200).json({
    result
  });
})

// UPDATE EMPLOYEE
router.put('/updateEmployee', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.updateEmployee(data)
  res.status(200).json({
    result
  });
})

// DELETE EMPLOYEE
router.delete('/deleteEmployee', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteEmployee(data)
  res.status(200).json({
    result
  });
})

// LIST EMPLOYEE
router.post('/listEmployeesByProject', async function(req,res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.listEmployeesByProject(data)
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

// LOGIN
router.post('/login', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.login(data)
  res.status(200).json({
    result
  });
});

// CREATE OBSERVATION
router.post('/createObservation', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.createObservation(data)
  res.status(200).json({
    result
  });
});

// READ OBSERVATION
router.post('/readObservation', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.readObservation(data)
  res.status(200).json({
    result
  });
});

// UPDATE OBSERVATION
router.post('/updateObservation', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.updateObservation(data)
  res.status(200).json({
    result
  });
});

module.exports = router;
