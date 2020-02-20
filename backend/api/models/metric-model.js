const mongoose = require('mongoose');

const metricSchema = mongoose.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
});

module.exports = mongoose.model('Metric', metricSchema, 'metric')
