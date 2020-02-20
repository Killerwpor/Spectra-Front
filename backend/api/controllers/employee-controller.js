///REQUIRES
const mongoose = require('mongoose');

///MODELS
const Employee = require('../models/employee-model');

///CONTROLLERS
const ProjectController = require('./project-controller');
const CompanyController = require('./company-controller');

//// API

//---------------------------- CRUDL --------------------------------------

// CREATE: Creates a new employee
function create(data){
  return new Promise(function(resolve, reject){

    Employee.findOne({ _id: data.id }).then(result => {
      console.log(!result);
      if(!result){
        // We create a new employee
        let newEmployee = new Employee({
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
          createdBy:     data.createdBy,
          creationDate:  data.creationDate
        });

        // We save the new employee
        newEmployee.save()
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

// READ: Gets an employee by its id.
// Note that no company id is needed since the id is unique.
function read(data){
  return new Promise(function(resolve, reject){
    Employee.findOne({ _id: data.id }).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  });
}

// UPDATE:
function update(data){
  return new Promise(function(resolve, reject){
    Employee.findByIdAndUpdate( data.id, data.updateObject )
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// DELETE: Deletes a employee by its id
function deleteById(data){
  return new Promise(function(resolve, reject){

    // We delete the employee, returning 1 on success and 0 on error.
    Employee.findByIdAndRemove({ _id: data.id })
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
    Employee.find({}).then(result => {
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

// DEBUG: DELETE ALL
function deleteAll(){
  return new Promise(function(resolve, reject){
    Employee.deleteMany({})
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// ------------------------------------------------------------------------

// Deletes ALL employees from a project.
/* Requires: company_id, project_id and employee_id*/
async function deleteAllFromProject(data){
  let project_id   = data.project_id
  let project_data = {
    company_id:      data.company_id,
    project_id:      data.project_id
  }

  return new Promise(function(resolve, reject){
    ProjectController.get(project_data).then(function(project){
      Employee.deleteMany({ _id: project.employee_list})
    }).catch(err => {
      reject(err)
    })
  });
}

async function deleteAllFromCompany(data){
  let company_id   = data.company_id
  let company_data = {
    id: data.id
  }
  return new Promise(function(resolve, reject){
    CompanyController.get(company_data).then(function(company){

      company.project_list.forEach(function(project){
        ProjectController.get(project_data).then(function(project){
          Employee.deleteMany({ _id: project.employee_list })
          .catch(err => {
            reject(err)
          })
        })
      })
    })
  });
}

module.exports = { create:    create,
                   read:      read,
                   update:    update,
                   list:      list,
                   deleteById:deleteById,
                   deleteAll: deleteAll }
