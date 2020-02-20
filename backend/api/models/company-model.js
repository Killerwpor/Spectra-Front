const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name:         { type: String, required: true },
  nit:          { type: String, required: true },
  email:        { type: String, required: true },
  contactName:  { type: String, required: true },
  contactPhone: { type: String, required: false },
  contactEmail: { type: String, required: true },
  project_list: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Project'
  }]
});

module.exports = mongoose.model('Company', companySchema);
