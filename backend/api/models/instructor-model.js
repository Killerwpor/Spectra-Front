const mongoose = require('mongoose');
const abstractUserSchema = require('./abstract-user-model');
const extendSchema = require('mongoose-extend-schema');

const instructorSchema = extendSchema(abstractUserSchema)

module.exports = mongoose.model('Instructor', instructorSchema);
