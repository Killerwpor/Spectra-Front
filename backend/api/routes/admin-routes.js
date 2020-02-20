// Requires
const express = require('express');
const router = express.Router();

// Models
const modelController = require('../controllers/admin-controller');

////////////////////API////////////////////

// CREATE
router.post('/create', async function(req, res){
  let data   = JSON.parse(req.body.data)
  let result = await modelController.create(data)
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

// DELETE
router.delete('/delete', async function(req, res){
  let result = await modelController.delete()
  res.status(200).json({
    result
  });
});

// LIST COMPANIES
router.get('/listCompanies', async function(req, res){
  let result = await modelController.listCompanies()
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
  let result = await modelController.listCompanyProjects()
  res.status(200).json({
    result
  });
});

// CREATE ADMIN
router.post('/createAdmin', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.createCompanyAdmin(data)
  res.status(200).json({
    result
  });
});

// READ ADMIN
router.post('/readAdmin', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readCompanyAdmin(data)
  res.status(200).json({
    result
  });
});

// UPDATE ADMINS
router.put('/updateAdmin', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.updateCompanyAdmin(data)
  res.status(200).json({
    result
  });
});

// DELETE ADMIN
router.delete('/deleteAdmin', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteCompanyAdmin(data)
  res.status(200).json({
    result
  });
});

// LIST ADMINS
router.get('/listAdmins', async function(req, res){
  let result = await modelController.listCompanyAdmins()
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
  let result = await modelController.listCompanyInstructors()
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
  let result = await modelController.listCompanyEmployees()
  res.status(200).json({
    result
  });
});

// CREATE COMPANY
router.post('/createCompany', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.createCompany(data)
  res.status(200).json({
    result
  });
});

// READ COMPANY
router.post('/readCompany', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.readCompany(data)
  res.status(200).json({
    result
  });
});

// UPDATE COMPANY
router.put('/updateCompany', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.updateCompany(data)
  res.status(200).json({
    result
  });
});

// DELETE COMPANY
router.delete('/deleteCompany', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.deleteCompany(data)
  res.status(200).json({
    result
  });
});

// LIST COMPANY
router.delete('/listCompany', async function(req, res){
  let data = JSON.parse(req.body.data)
  let result = await modelController.listCompanies(data)
  res.status(200).json({
    result
  });
});

module.exports = router;
