// Requires
const express = require('express');
const router = express.Router();
const validator = require('validator');

// Models
const modelController = require('../controllers/employee-controller');

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

// DEBUG: DELETE ALL
router.delete('/deleteAll', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteAll(data)
  res.status(200).json({
    result
  });
});

module.exports = router;
