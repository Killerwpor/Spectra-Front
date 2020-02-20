//REQUIRES
const mongoose = require('mongoose');

///MODELS
const Instructor = require('../models/instructor-model');
const Company    = require('../models/company-model')
const Project    = require('../models/project-model')
const Employee   = require('../models/employee-model')

///CONTROLLERS
const ProjectController  = require('./project-controller');
const CompanyController  = require('./company-controller');
const EmployeeController = require('./employee-controller');

//// API

//---------------------------- CRUDL --------------------------------------

// CREATE: Creates a new Instructor
function create(data){
  return new Promise(function(resolve, reject){

    Instructor.findOne({ _id: data.id }).then(result => {
      console.log(!result);
      if(!result){
        // We create a new Instructor
        let newInstructor = new Instructor({
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

        // We save the new Instructor
        newInstructor.save()
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

// READ: Gets an Instructor by its id.
// Note that no company id is needed since the id is unique.
function read(data){
  return new Promise(function(resolve, reject){
    Instructor.findOne({ _id: data.id }).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

// UPDATE:
function update(data){
  return new Promise(function(resolve, reject){
    Instructor.findByIdAndUpdate( data.id, data.updateObject )
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// DELETE: Deletes a Instructor by its id
function deleteById(data){
  return new Promise(function(resolve, reject){

    // We delete the Instructor, returning 1 on success and 0 on error.
    Instructor.findByIdAndRemove({ _id: data.id })
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    });
  });
}

// LIST:
function list(){
  return new Promise(function(resolve, reject){
    Instructor.find({}).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

// DEBUG: DELETE ALL
function deleteAll(){
  return new Promise(function(resolve, reject){
    Instructor.deleteMany({})
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// ------------------------------------------------------------------------

function createEmployee(data){
  return new Promise(async function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      if(project.instructor_list.includes(data.instructorId)){
        let newEmployee = EmployeeController.create(data)
        resolve(newEmployee)
      }
    })
    .catch(err => {

      reject(err)});

  });
}

function readEmployee(data){
  return new Promise(async function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      if(project.instructor_list.includes(data.instructorId)){
        let employee =  EmployeeController.read(data)
        resolve(employee)
      }
    })
    .catch(err => {
      reject(err)
    });
  })
}

function updateEmployee(data){
  return new Promise(async function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      if(project.instructor_list.includes(data.instructorId)){
        let employee =  EmployeeController.update(data)
        resolve(employee)
      }
    })
    .catch(err => {
      reject(err)
    });
  })
}

function deleteEmployee(data){
  return new Promise(async function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      if(project.instructor_list.includes(data.instructorId)){
        let employee =  EmployeeController.deleteById(data)
        resolve(employee)
      }
    })
    .catch(err => {
      reject(err)
    });
  })
}

function listEmployeesByProject(data){
  return new Promise(async function(resolve, reject){
    Project.findById(data.projectId).populate('employee_list').select('employee_list')
    .then(result => {
      console.log(result);
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  })
}

function login(data){
  return new Promise(function(resolve, reject){
    Instructor.find({}).then(result => {

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

function createObservation(data){
  return new Promise(function(resolve, reject){
    updateObject = {
      observation: data.text
    }
    Employee.findByIdAndUpdate(data.employeeId, updateObject).then(result => {
      resolve(updateObject)
    }).catch(err => {
      reject(err)
    });
  });
}

function readObservation(data){
  return new Promise(function(resolve, reject){
    console.log(data.employeeId);
    Employee.findById(data.employeeId).then(result => {
      console.log(result);
      resolve(result.observation)
    }).catch(err => {
      reject(err)
    });
  });
}

function updateObservation(data){
  return new Promise(function(resolve, reject){
    Employee.findByIdAndUpdate(data.employeeId, data.updateObject).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    });
  });
}

module.exports = { create:    create,
                   read:      read,
                   update:    update,
                   list:      list,
                   deleteAll: deleteAll,
                   deleteById: deleteById,
                   createEmployee: createEmployee,
                   readEmployee:   readEmployee,
                   updateEmployee: updateEmployee,
                   deleteEmployee: deleteEmployee,
                   listEmployeesByProject: listEmployeesByProject,
                   login: login,
                   createObservation: createObservation,
                   readObservation: readObservation,
                   updateObservation: updateObservation }
