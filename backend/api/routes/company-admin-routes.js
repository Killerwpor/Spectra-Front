// Requires
const express = require('express');
const router = express.Router();
const validator = require('validator');

// Models
const modelController = require('../controllers/company-admin-controller');

////////////////////API////////////////////

// CREATE
router.post('/create', async function(req, res){
  let data = JSON.parse(req.body.data)
  console.log(validator.isEmail(data.email));
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

// DEBUG: DELETE DELETE ALL
router.delete('/deleteAll', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteAll(data)
  res.status(200).json({
    result
  });
});

// CREATE PROJECT
router.post('/createProject', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.createCompanyProject(data)
  res.status(200).json({
    result
  });
});

// READ PROJECT
router.post('/readProject', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readCompanyProject(data)
  res.status(200).json({
    result
  });
});

// UPDATE PROJECT
router.put('/updateProject', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.updateCompanyProject(data)
  res.status(200).json({
    result
  });
});

// DELETE PROJECT
router.delete('/deleteProject', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteCompanyProject(data)
  res.status(200).json({
    result
  });
});

// LIST PROJECTS
router.get('/listProjects', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.listCompanyProjects(data)
  res.status(200).json({
    result
  });
});

// CREATE INSTRUCTOR
router.post('/createInstructor', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.createCompanyInstructor(data)
  res.status(200).json({
    result
  });
});

// READ INSTRUCTOR
router.post('/readInstructor', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readCompanyInstructor(data)
  res.status(200).json({
    result
  });
});

// UPDATE INSTRUCTOR
router.put('/updateInstructor', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.updateCompanyInstructor(data)
  res.status(200).json({
    result
  });
});

// DELETE INSTRUCTOR
router.delete('/deleteInstructor', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteCompanyInstructor(data)
  res.status(200).json({
    result
  });
});

// LIST INSTRUCTORS
router.get('/listInstructors', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.listCompanyInstructors(data)
  res.status(200).json({
    result
  });
});

// CREATE EMPLOYEE
router.post('/createEmployee', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.createCompanyEmployee(data)
  res.status(200).json({
    result
  });
});

// READ EMPLOYEE
router.post('/readEmployee', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readCompanyEmployee(data)
  res.status(200).json({
    result
  });
});

// UPDATE EMPLOYEE
router.put('/updateEmployee', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.updateCompanyEmployee(data)
  res.status(200).json({
    result
  });
});

// DELETE EMPLOYEE
router.delete('/deleteEmployee', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteCompanyEmployee(data)
  res.status(200).json({
    result
  });
});

// LIST EMPLOYEES
router.get('/listEmployees', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.listCompanyEmployees(data)
  res.status(200).json({
    result
  });
});

// LOGIN
router.post('/login', async function(req, res){
  console.log(req.body);
  /*let data   = JSON.parse(req.body.data)
  let result = await modelController.login(data)*/
  res.status(200).json({
    //result
  });
});

module.exports = router;
