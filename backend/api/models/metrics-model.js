const mongoose = require('mongoose');

const metricsSchema = mongoose.Schema({
    metric      : { type: String, required: true },
    employeeId  : [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true
    }],
    inspectorId : [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true
    }],
    projectId   : {
      type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true
    },
    date        : { type: String, required: true },
    values      : [{
      type      : mongoose.Schema.Types.ObjectId, ref: 'Metric', required: true
    }]
});

module.exports = mongoose.model('Metrics', metricsSchema, 'metrics')
