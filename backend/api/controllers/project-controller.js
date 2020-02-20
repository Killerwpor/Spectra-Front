///REQUIRES
const mongoose = require('mongoose');

///MODELS
const Metrics      = require('../models/metrics-model');
const Employee     = require('../models/employee-model');
const Instructor   = require('../models/instructor-model');
const CompanyAdmin = require('../models/company-admin-model');
const Project      = require('../models/project-model')
const Company      = require('../models/company-model')

///CONTROLLERS
const CompanyController      = require('./company-controller');
const EmployeeController     = require('./employee-controller');
const InstructorController   = require('./instructor-controller');
const MetricsController      = require('./metric-controller');

///FUNCTIONS
function arrayRemove(arr, value){
  return arr.filter(function(elem){
    return elem != value;
  })
}

//// API
// CREATE
function create(data){

  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .then(company => {
      // We create a new project

      let newProject = new Project({
        name:            data.name,
        description:     data.description,
        logo:            data.logo,
        companyId:       data.companyId
      })

      if(data.adminId){
        newProject.admin_list.push(data.adminId)
      } else if (data.instructorId){
        newProject.instructor_list.push(data.instructorId)
      }
      company.project_list.push(newProject.id)

      company.save()
      .then(result => {
        // Now we save the project we just created
        newProject.save()
        .then(result => {
          let updateObject = {
            companyId: newProject.companyId
          }

          CompanyAdmin.findByIdAndUpdate(data.adminId, updateObject)
          .then(admin => {
            resolve(result)
          })
          .catch(err => {
            // CompanyAdmin catch
            resolve(err)
          });
        })
        .catch(err => {
          // new project catch
          resolve(err)
        });
      })
      .catch(err => {
        // company catch
        resolve(err)
      })
    })
    .catch(err => {
      //Company catch
      reject(err)
    });
  });
}

function assignProject(data){
  return new Promise(function(resolve, reject){
    Company.findById(data.companyId)
    .then(company => {
      company.project_list.push(data.id)
      console.log(company);
      company.save()
      .then(result => {
        Project.findById(data.id)
        .then(project => {
          project.companyId = data.companyId;
          project.save()
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
        })
        .catch(err => {
          reject(err)
        })
      })
      .catch(err => {
        reject(err)
      })
    })
    .catch(err => {
      reject(err)
    })
  })
}

// READ
// Given a company and a project id, return the project.
function read(data){
  return new Promise(async function(resolve, reject){

    Project.findOne({ _id: data.id })
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// UPDATE
function update(data){
  return new Promise( function(resolve, reject){
    Project.findByIdAndUpdate(data.id, data.updateObject)
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  });
}

// DELETE
function deleteById(data){
  return new Promise( function(resolve, reject){
      Project.findByIdAndRemove({ _id: data.id })
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        reject(err)
      })
  });
}

// LIST
function list(){
  return new Promise(function(resolve, reject){
      Project.find({})
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
    Project.deleteMany({})
    .then(result => {
      resolve(result)
    })
    .catch(err => {
      reject(err)
    })
  })
}

// EMPLOYEE LIST OPERATIONS
// APPEND
function assignEmployee(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      try {
        if(!project.employee_list.includes(data.employeeId)){
          project.employee_list.push(data.employeeId)
          Employee.findByIdAndUpdate(data.Id, data.updateObject)
          .then(result => {
            project.save().then(result => {
              result.save().then(result => {
                resolve(project)
              })
            })
          })
          .catch(err => {
            resolve(err)
          });
        } else {
          // User already included.
          resolve({
            Message: "User already exists."
          })
        }
      } catch (err) {
        reject(err)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

// READ
function readEmployee(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      console.log(project.employee_list.includes(data.employeeId));
      if(project.employee_list.includes(data.employeeId)){
        Employee.findById(data.employeeId)
        .then(employee => {
          resolve(employee)
        })
        .catch(err => {
          reject(err)
        })
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

// DELETE
function deleteEmployee(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      project.employee_list = arrayRemove(project.employee_list, data.employeeId)
      project.save()
      resolve(project)
    })
    .catch(err => {
      reject(err)
    })
  })
}

// LIST
function listEmployees(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      resolve(project.employee_list)
    })
    .catch(err => {
      reject(err)
    })
  })
}


// INSTRUCTOR LIST OPERATIONS
// APPEND
function assignInstructor(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      try {
        if(!project.instructor_list.includes(data.instructorId)){
          project.instructor_list.push(data.instructorId)
          Instructor.findByIdAndUpdate(data.Id, data.updateObject)
          .then(result => {
            project.save().then(result => {
              result.save().then(result => {
                resolve(result)
              })
            })
          })
          .catch(err => {
            resolve(err)
          });
        } else {
          // User already included.
          resolve({
            Message: "Instructor already exists."
          })
        }
      } catch (err) {
        reject(err)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

function readInstructor(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      console.log(project.instructor_list.includes(data.instructorId));
      if(project.instructor_list.includes(data.instructorId)){
        Instructor.findById(data.instructorId)
        .then(instructor => {
          resolve(instructor)
        })
        .catch(err => {
          reject(err)
        })
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

function deleteInstructor(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      project.instructor_list = arrayRemove(project.instructor_list, data.instructorId)
      project.save()
      resolve(project)
    })
    .catch(err => {
      reject(err)
    })
  })
}

function listInstructors(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      resolve(project.instructor_list)
    })
    .catch(err => {
      reject(err)
    })
  })
}

// ADMIN LIST OPERATIONS
// APPEND
function assignAdmin(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      try {
        if(!project.admin_list.includes(data.adminId)){
          project.admin_list.push(data.adminId)
          CompanyAdmin.findByIdAndUpdate(data.Id, data.updateObject)
          .then(result => {
            project.save().then(result => {
              result.save().then(result => {
                resolve(result)
              })
            })
          })
          .catch(err => {
            resolve(err)
          });
        } else {
          // User already included.
          resolve({
            Message: "Admin already exists."
          })
        }
      } catch (err) {
        reject(err)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

// READ
function readAdmin(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      console.log(project.admin_list.includes(data.adminId));
      if(project.admin_list.includes(data.adminId)){
        CompanyAdmin.findById(data.adminId)
        .then(admin => {
          resolve(admin)
        })
        .catch(err => {
          reject(err)
        })
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

// DELETE
function deleteAdmin(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      project.admin_list = arrayRemove(project.admin_list, data.adminId)
      project.save()
      resolve(project)
    })
    .catch(err => {
      reject(err)
    })
  })
}

// LIST
function listAdmins(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      resolve(project.admin_list)
    })
    .catch(err => {
      reject(err)
    })
  })
}

// METRICS LIST OPERATIONS
// APPEND
function assignMetric(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      try {
        if(!project.metrics_list.includes(data.metricId)){
          project.metrics_list.push(data.metricId)
          project.save()
          .then(project => {
            resolve(project)
          })
          .catch(err => {
            reject(err)
          })
        } else {
          // Metric already included.
          resolve({
            Message: "Metric already exists."
          })
        }
      } catch (err) {
        reject(err)
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

function readMetric(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      console.log(project.metrics_list.includes(data.metricId));
      if(project.metrics_list.includes(data.metricId)){
        Metrics.findById(data.metricId)
        .then(metric => {
          resolve(metric)
        })
        .catch(err => {
          reject(err)
        })
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

//
function deleteMetric(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      project.metrics_list = arrayRemove(project.metrics_list, data.metricId)
      project.save()
      resolve(project)
    })
    .catch(err => {
      reject(err)
    })
  })
}

//
function listMetrics(data){
  return new Promise(function(resolve, reject){
    Project.findById(data.projectId)
    .then(project => {
      resolve(project.metrics_list)
    })
    .catch(err => {
      reject(err)
    })
  })
}

module.exports = { create, read, update, deleteById, list, assignInstructor,
    readInstructor, listInstructors, deleteInstructor, assignMetric, readMetric,
    listMetrics, deleteMetric, assignEmployee, readEmployee, deleteEmployee,
    listEmployees, assignAdmin, readAdmin, listAdmins, deleteAdmin, deleteAll,
    assignProject };
