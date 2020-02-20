///REQUIRES
const mongoose = require('mongoose');

///MODELS
const Admin        = require('../models/admin-model');
const Employee     = require('../models/employee-model');
const Instructor   = require('../models/instructor-model');
const CompanyAdmin = require('../models/company-admin-model');
const Company      = require('../models/company-model');
const Project      = require('../models/project-model');

///CONTROLLERS
const CompanyController      = require('./company-controller');
const EmployeeController     = require('./employee-controller');
const InstructorController   = require('./instructor-controller');
const CompanyAdminController = require('./company-admin-controller');
const MetricsController      = require('./metric-controller');
const ProjectController      = require('./project-controller')

///FUNCTIONS
function arrayRemove(arr, value){
  return arr.filter(function(elem){
    return elem != value;
  })
}

//// API

function create(data){
  return new Promise(function(resolve, reject){
    // Check if instance already exists.
    Admin.find({})
    .then(result => {
      // Check if the query is returns empty
      if(result.length == 0){
        // Create new admin
        let newAdmin = new Admin({
          name: data.name,
          password: data.password
        });

        newAdmin.save().then(result => {
          resolve({
            Message: "Administrador creado."
          });
        }).catch(err => {
          reject(err);
        });
      }
        // Admin ya fue creado
    }).catch(err => {
      reject(err);
    });
  })
}

// DEBUG: Eliminar el admin
function deleteAdmin(){
  return new Promise(function(resolve, reject){
    Admin.deleteMany().then(result => {
      resolve(result);
    }).catch(err => {
      reject(err)
    });
  })
}

function login(data){
  return new Promise(function(resolve, reject){
    Admin.find({}).then(result => {

      let admin_name = result[0].name
      let admin_pass = result[0].password

      if(admin_name === data.name && admin_pass === data.password){
        resolve(result[0])
      }

      resolve({
        message: "Nombre o contrasena erronea."
      });
    }).catch(err => {
      reject({
        err
      });
    });
  })

}

// LIST COMPANIES
async function listCompanies(){
  return new Promise(async function(resolve, reject){
    let companyList = await CompanyController.list()
    resolve(companyList)
  })
}

async function listCompanyAdmins(data){
  return new Promise(async function(resolve, reject){
    let result = await CompanyAdminController.list();
    resolve(result);
  })
}

async function listCompanyInstructors(data){
  return new Promise(async function(resolve, reject){
    let result = await InstructorController.list();
    resolve(result);
  })
}

async function listCompanyEmployees(data){
  return new Promise(async function(resolve, reject){
    let result = await EmployeeController.list();
    resolve(result);
  })
}

async function listCompanyProjects(data){
  return new Promise(async function(resolve, reject){
    let result = await ProjectController.list();
    resolve(result);
  })
}

// READ:
async function readCompany(data){
  return new Promise(async function(resolve, reject){
    let result = await CompanyController.read(data)
    resolve(result);
  })
}

// READ ADMIN
async function readCompanyAdmin(data){
  return new Promise(async function(resolve, reject){
    let result = await CompanyAdminController.read(data);
    resolve(result);
  })
}

// READ INSTRUCTOR
async function readCompanyInstructor(data){
  return new Promise(async function(resolve, reject){
    let result = await InstructorController.read(data);
    resolve(result);
  })
}

// READ EMPLOYEE
async function readCompanyEmployee(data){
  return new Promise(async function(resolve, reject){
    let result = await EmployeeController.read(data);
    resolve(result);
  })
}

// READ PROJECT
async function readCompanyProject(data){
  return new Promise(async function(resolve, reject){
    let result = await ProjectController.read(data);
    resolve(result);
  })
}

// CREATE COMPANY
async function createCompany(data){
  return new Promise(async function(resolve, reject){
    let result = await CompanyController.create(data)
    resolve(result)
  })
}

function createCompanyAdmin(data){
  return new Promise(function(resolve, reject){
    let result = CompanyAdminController.create(data);
    resolve(result);
  });
}

function createCompanyInstructor(data){
  return new Promise(function(resolve, reject){
    let result = InstructorController.create(data);
    resolve(result);
  });
}

function createCompanyEmployee(data){
  return new Promise(function(resolve, reject){
    let result = EmployeeController.create(data);
    resolve(result);
  });
}

function createCompanyProject(data){
  console.log(ProjectController);
  return new Promise(function(resolve, reject){
    let result = ProjectController.create(data);
    resolve(result);
  });
}

async function updateCompany(data){
  return new Promise(async function(resolve, reject){
    let result = await CompanyController.update(data)
    resolve(result)
  })
}

async function updateCompanyAdmin(data){
  return new Promise(async function(resolve, reject){
    let result = await CompanyAdminController.update(data);
    resolve(result)
  })
}

async function updateCompanyInstructor(data){
  return new Promise(async function(resolve, reject){
    let result = await InstructorController.update(data);
    resolve(result)
  })
}

async function updateCompanyEmployee(data){
  return new Promise(async function(resolve, reject){
    let result = await EmployeeController.update(data);
    resolve(result)
  })
}

async function updateCompanyProject(data){
  return new Promise(async function(resolve, reject){
    let result = await ProjectController.update(data);
    resolve(result)
  })
}

// DELETE:
function deleteCompany(data){
  return new Promise(function(resolve, reject){
    let result = CompanyController.deleteById(data)
    resolve(result)
  })
}

//
function deleteCompanyAdmin(data){
  return new Promise(function(resolve, reject){
    let result = CompanyAdminController.deleteById(data)
    resolve(result)
  })
}

function deleteCompanyInstructor(data){
  return new Promise(function(resolve, reject){
    let result = InstructorController.deleteById(data)
    resolve(result)
  })
}

function deleteCompanyEmployee(data){
  return new Promise(function(resolve, reject){
    let result = EmployeeController.deleteById(data)
    resolve(result)
  })
}

function deleteCompanyProject(data){
  return new Promise(function(resolve, reject){
    let result = ProjectController.deleteById(data)
    resolve(result)
  })
}

module.exports = { create, delete: deleteAdmin, login, listCompanyAdmins,
   listCompanyInstructors, listCompanyEmployees, listCompanyProjects, listCompanies,
   readCompany, readCompanyAdmin, readCompanyInstructor, readCompanyEmployee,
   readCompanyProject, deleteCompany, deleteCompanyEmployee,
   deleteCompanyInstructor, deleteCompanyAdmin, deleteCompanyProject,
   updateCompany, updateCompanyAdmin, updateCompanyProject,
   updateCompanyEmployee, updateCompanyInstructor, createCompanyAdmin,
   createCompanyInstructor, createCompanyEmployee, createCompanyProject,
   createCompany }
