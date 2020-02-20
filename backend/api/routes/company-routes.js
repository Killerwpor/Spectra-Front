// Requires
const express = require('express');
const router  = express.Router();
const validator = require('validator');

// Models
const modelController = require('../controllers/company-controller');

///CONTROLLERS
const ProjectController = require('../controllers/project-controller')

////////////////////API////////////////////

// CREATE
router.post('/create', async function(req, res){
  let data = JSON.parse(req.body.data)
  if(validator.isEmail(data.contactEmail) && validator.isEmail(data.email)){
    let result = await modelController.create(data)
    res.status(200).json({
      result
    });
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

// APPEND
router.post('/assignProject', async function(req, res){
  let data = JSON.parse(req.body.data)

  let project_data = {
    name:        data.name,
    description: data.description,
    logo:        data.logo,
    companyId:   data.companyId,
    adminId:     data.adminId
  }

  let project = await ProjectController.create(project_data)
  modelController.assignProject(project, data.companyId)
})

router.post('/listAdmins', async function(req, res){
  let data = JSON.parse(req.body.data);
  let result = await modelController.listAdmins(data)
  res.status(200).json({
    result
  });
})

router.post('/listInstructors', async function(req, res){
  let data = JSON.parse(req.body.data);
  let result = await modelController.listInstructors(data)
  res.status(200).json({
    result
  });
})

router.post('/listEmployees', async function(req, res){
  let data = JSON.parse(req.body.data);
  let result = await modelController.listEmployees(data)
  res.status(200).json({
    result
  });
})

router.post('/listEmployeesByProject', async function(req, res){
  let data = JSON.parse(req.body.data);
  let result = await modelController.listEmployeesByProject(data)
  res.status(200).json({
    result
  });
})

router.post('/listProjects', async function(req, res){
  let data = JSON.parse(req.body.data);
  let result = await modelController.listProjects(data)
  res.status(200).json({
    result
  });
})

module.exports = router;
