///REQUIRES
const mongoose  = require('mongoose');

///MODELS
const Company      = require('../models/company-model');
const Employee     = require('../models/employee-model');
const Instructor   = require('../models/instructor-model');
const CompanyAdmin = require('../models/company-admin-model');
const Project      = require('../models/project-model');

///CONTROLLERS
const ProjectController = require('./project-controller')

//// API

// CREATE
// Creates a new companny given
function create(data) {

  return new Promise(function(resolve, reject){
      let newCompany = new Company({
        name        : data.name,
        nit         : data.nit,
        email       : data.email,
        contactName : data.contactName,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail
      });

      // Now we save the project we just created
      newCompany.save()
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      });
  });
}

// READ
// Returns a company given it's id
function read(data){

  return new Promise(function(resolve, reject){
    // We search all companies for the company with the given id.
    Company.findOne({ _id: data.id })
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    });
  });
}

// UPDATE
function update(data) {

  return new Promise(function(resolve, reject){
    Company.findByIdAndUpdate(data.id, data.updateObject)
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// DELETE
function deleteById(data) {
  return new Promise(function(resolve, reject){
    Company.findByIdAndRemove( data.id )
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// LIST
function list(data) {

  return new Promise(function(resolve, reject){
    Company.find({})
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// DEBUG: DELETE ALL
function deleteAll(){
  return new Promise(function(resolve, reject){
    Company.deleteMany({})
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  })
}

// LIST: LIST all admins from a given companyId
function listAdmins(data){
  return new Promise(function(resolve, reject){
    let result = []
    Company.findById(data.companyId)
    .populate({path: "project_list",
    populate:{ path: "admin_list" }})
    .then(company => {
      company.project_list.forEach(function(project){
        result = result.concat(project.admin_list)
      })
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

//
function listInstructors(data){
  return new Promise(function(resolve, reject){
    let result = []
    Company.findById(data.companyId)
    .populate({path:"project_list",
    populate:{path:"instructor_list"}})
    .then(company => {
      company.project_list.forEach(function(project){
        result = result.concat(project.instructor_list)
      })
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

//
function listProjects(data){
  return new Promise(function(resolve, reject){
    Company.findById( data.companyId )
    .populate({ path: "project_list",
    populate: { path: "metrics_list admin_list instructor_list employee_list"}})
    .then(result => {
      resolve(result.project_list)
    })
    .catch(err => {
      reject(err)
    })
  });
}

//
function listEmployeesByProject(data){
  return new Promise(function(resolve, reject){
    Project.findById( data.projectId )
    .populate("employee_list")
    .then(result => {
      resolve(result.employee_list);
    })
    .catch(err => {
      reject(err);
    })
  });
}

//
function listEmployees(data){
  return new Promise(function(resolve, reject){
    let result = []
    Company.findById(data.companyId)
    .populate({ path:"project_list",
    populate: { path:"employee_list" }})
    .then(company => {
      company.project_list.forEach(function(project){
        result = result.concat(project.employee_list)
      })
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// Adds a new project into the company project list.
// NOTE: Redundant with other model methods.
/*function assignProject(project, companyId){

  return new Promise(async function(resolve, reject){
    let company = await read({ id: companyId });
    company.project_list.push(project);
    company.save()
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}*/



module.exports = { create, read, update, deleteById, list,
deleteAll, listAdmins, listEmployees, listInstructors, listProjects,
listEmployeesByProject};// assignProject };
