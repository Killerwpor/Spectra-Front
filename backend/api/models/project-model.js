const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  logo: { type: String, required: false },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  metrics_list: [{
    type: mongoose.Schema.Types.ObjectId, ref:'Metrics'
  }],
  admin_list: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'CompanyAdmin'
  }],
  instructor_list: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'
  }],
  employee_list: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
  }]
});

module.exports = mongoose.model('Project', projectSchema);
