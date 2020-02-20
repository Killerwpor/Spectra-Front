const mongoose = require('mongoose');
const abstractUserSchema = require('./abstract-user-model');
const extendSchema = require('mongoose-extend-schema');

const employeeSchema = extendSchema(abstractUserSchema, {
  observation: {
    type: String, required: false
  },
  createdBy:    {
    type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: false
  },
  creationDate: {
    type: Date, required: false
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
