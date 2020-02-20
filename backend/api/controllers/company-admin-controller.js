///REQUIRES
const mongoose = require('mongoose');

///MODELS
const CompanyAdmin = require('../models/company-admin-model');
const Company      = require('../models/company-model')

///CONTROLLERS
const CompanyController      = require('./company-controller');
const EmployeeController     = require('./employee-controller');
const InstructorController   = require('./instructor-controller');
const CompanyAdminController = require('./company-admin-controller');
const MetricsController      = require('./metric-controller');
const ProjectController      = require('./project-controller');

//// API

//---------------------------- CRUDL --------------------------------------

// CREATE: Creates a new CompanyAdmin
/* REQUIRES:
  firstName, lastName, password, documentType, nin, gender, address,
  city, state, country, email, phone, cellphone, birthDate, companyId,
  department, position, profilePicURL
*/
function create(data){
  return new Promise(function(resolve, reject){
    CompanyAdmin.findOne({ _id: data.id }).then(result => {
      if(!result){
        // We create a new CompanyAdmin
        let newCompanyAdmin = new CompanyAdmin({
          firstName:     data.firstName,
          lastName:      data.lastName,
          password:      data.password,
          documentType:  data.documentType,
          nin:           data.nin,
          gender:        data.gender,
          address:       data.address,
          city:          data.city,
          state:         data.state,
          country:       data.country,
          email:         data.email,
          phone:         data.phone,
          cellphone:     data.cellphone,
          birthDate:     data.birthDate,
          companyId:     data.companyId,
          department:    data.department,
          position:      data.position,
          profilePicURL: data.profileURL,
        });

        // We save the new CompanyAdmin
        newCompanyAdmin.save()
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        });
      }
    }).catch(err => {
      reject(err)
    })
  });
}

// READ: Gets an CompanyAdmin by its id.
/* REQUIRES:
  id
*/
function read(data){
  return new Promise(function(resolve, reject){
    CompanyAdmin.findOne({ _id: data.id }).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

// UPDATE: Updates the CompanyAdmin
/* REQUIRES:
  id, updateObject
*/
function update(data){
  return new Promise(function(resolve, reject){
    CompanyAdmin.findByIdAndUpdate( data.id, data.updateObject )
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// DELETE: Deletes a CompanyAdmin by its id
/* REQUIRES:
  id
*/
function deleteById(data){
  return new Promise(function(resolve, reject){

    // We delete the CompanyAdmin, returning 1 on success and 0 on error.
    CompanyAdmin.findByIdAndRemove({ _id: data.id })
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    });

  });
}

// LIST: Lists all CompanyAdmins
// RETURN: Code 200 if success, code 500 if fail
function list(){
  return new Promise(function(resolve, reject){
    CompanyAdmin.find({}).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

// DEBUG: DELETE ALL
// RETURN: Code 200 if success, code 500 if fail
function deleteAll(){
  return new Promise(function(resolve, reject){
    CompanyAdmin.deleteMany({})
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

async function listCompanyInstructors(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      console.log(result);
      result.project_list.forEach(function(elem){
        console.log(3);
        if(elem.admin_list.includes(data.adminId)){
          console.log(4);
          let result = InstructorController.list();
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
      //This point means there was NO element in the array
    })
    .catch(err => {
      reject(err);
    })
  })
}

async function listCompanyEmployees(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result =  EmployeeController.list();
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

async function listCompanyProjects(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = ProjectController.list();
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}


// READ INSTRUCTOR
async function readCompanyInstructor(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = InstructorController.read(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

// READ EMPLOYEE
async function readCompanyEmployee(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = EmployeeController.read(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

// READ PROJECT
async function readCompanyProject(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = ProjectController.read(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

function createCompanyInstructor(data){
  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      console.log(result.project_list);
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = InstructorController.create(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  });
}

function createCompanyEmployee(data){
  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = EmployeeController.create(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  });
}

function createCompanyProject(data){
  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          console.log(ProjectController);
          let result = ProjectController.create(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  });
}

async function updateCompanyInstructor(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = InstructorController.update(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

async function updateCompanyEmployee(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = EmployeeController.update(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

async function updateCompanyProject(data){
  return new Promise(async function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let result = ProjectController.update(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

function deleteCompanyInstructor(data){
  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let res = InstructorController.deleteById(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

function deleteCompanyEmployee(data){
  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let res = EmployeeController.deleteById(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

function deleteCompanyProject(data){
  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .populate({path: "project_list"})
    .then(result => {
      result.project_list.forEach(function(elem){
        if(elem.admin_list.includes(data.adminId)){
          let res = ProjectController.deleteById(data);
          resolve(result);
        }
      })
      //This point means there was NO element in the array
      resolve("No projects asociated to this company.")
    })
    .catch(err => {
      reject(err);
    })
  })
}

function login(data){
  return new Promise(function(resolve, reject){
    CompanyAdmin.find({}).then(result => {

      let instructor_name = result[0].email
      let instructor_pass = result[0].password

      if(instructor_name === data.email && instructor_pass === data.password){

        resolve(result)
      }

      resolve({
        message: "Correo o contrasena erronea."
      });
    }).catch(err => {
      reject({
        err
      });
    });
  })
}

module.exports = { create, read, update, list, deleteById, deleteAll, login,
   listCompanyInstructors, listCompanyEmployees, listCompanyProjects,
   readCompanyInstructor, readCompanyEmployee, readCompanyProject,
   deleteCompanyEmployee, deleteCompanyInstructor, deleteCompanyProject,
   updateCompanyProject, updateCompanyEmployee, updateCompanyInstructor,
   createCompanyInstructor, createCompanyEmployee, createCompanyProject }
