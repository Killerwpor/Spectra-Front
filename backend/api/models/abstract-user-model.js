const mongoose = require('mongoose');
const defaultPic = "https://pbs.twimg.com/profile_images/518089855671074816/S_BpQudi_400x400.png";

const abstractUserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  documentType: { type: String, required: false },
  // NIN: National Identification Number.
  nin: { type: String, required: false, unique: true },
  gender: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  cellphone: { type: String, required: false },
  birthDate: { type: Date, required: false },
  companyId: { type: String, required: false },
  department: { type: String, required: false },
  position: { type: String, required: false },
  profilePicURL: { type: String, required: false, default: defaultPic}
});

module.exports = abstractUserSchema;
