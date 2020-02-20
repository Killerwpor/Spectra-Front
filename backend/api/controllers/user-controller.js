///REQUIRES
const mongoose    = require('mongoose');
const config      = require('../../config/config');
/*
///MODELS
const User = require('../models/user-model');

//// API

// Create: Creates the user using the request given.
// Returns the creation message and result or error.
exports.create = (req, res, next) => {
  // Parse request into a JSON object.
  let data = JSON.parse(req.body.data);

  User.find({ "documentType": data.documentType , "nin": data.nin })
  .then(result => {
    if(result === null || result.length === 0 || result === undefined){
      // The user does not exist and we can create it.
      // Lets create a new user with the given data.
      let newUser =    new User({
        firstName:     data.firstName,
        lastName:      data.lastName,
        password:      data.pass,
        documentType:  data.documentType,
        nin:           data.nin,
        ranking:       data.ranking,
        gender:        data.gender,
        address:       data.addr,
        city:          data.city,
        state:         data.state,
        country:       data.country,
        email:         data.email,
        phone:         data.phone,
        cellphone:     data.cellphone,
        birthDate:     data.birthDate,
        company:       data.company,
        department:    data.department,
        position:      data.position,
        profilePicURL: data.profileURL,
        nit:           data.nit
      });

      console.log(newUser.password);

      // Save the object into mongoose
      newUser.save().then(result => {
        res.status(200).json({
          message: 'User successfully created.',
          result
        });
      }).catch(err => {
        res.status(500).json({
          error: err,
          message: "User couldn't be created."
        });
      });

    } else {
      // The user already exists and we will return an error status
      message_data = "User already exists with document ";
      message_data.concat(data.documentType, ' ', data.nin)
      res.status(200).json({
        message: message_data
      });
    }
  }).catch(err => {
    res.status(500).json({
      message: "Something went wrong while creating user.",
      error: err
    });
  });
}

// List: Lists ALL users.
// Returns an ARRAY of USERS.
exports.list = (req, res, next) => {
  User.find({})
  .then(result => {
    res.status(200).json({
      message: "Listed users successfully.",
      result
    });
  }).catch(err => {
    res.status(500).json({
      error: err,
      message: "An error ocurred while listing the users."
    });
  });
}

// findById: returns a user given an ID.
// Returns a SINGLE USER.
exports.findById = (req, res, next) => {
  let data = JSON.parse(req.body.data)

  User.findOne({"_id": data.id})
  .then(result => {
    res.status(200).json({
      message: "Listed user successfully.",
      result
    });
  }).catch(err => {
    res.status(500).json({
      error: err,
      message: "An error ocurred while listing the user."
    });
  });
}

// updateById: updates a user by its ID
exports.updateById = (req, res, next) => {
  let data = JSON.parse(req.body.data);
  let id = data.id;
  delete data.id;

  User.findOneAndUpdate({ "_id": id }, data)
  .then(result => {
    res.status(200).json({
      message: "Update successfull.",
      result
    });
  }).catch(err => {
    res.status(500).json({
      message: "Couldn't update the user.",
      err
    });
  });
}

// deleteId: deletes a SINGLE user by its ID.
exports.deleteById = (req, res, next) => {
  let data = JSON.parse(req.body.data);

  User.findOneAndDelete({"_id": data.id})
  .then(result => {
    res.status(200).json({
      message: "User deleted.",
      result
    });
  }).catch(err => {
    res.status(500).json({
      message: "An error ocurred while trying to delete the user.",
      err
    });
  });
}

// deleteAll: deletes ALL the users.
exports.deleteAll = (req, res, next) => {
  User.deleteMany().then(result => {
    res.status(200).json({
      message: "Users deleted.",
      result
    })
  }).catch(err => {
    res.status(500).json({
      message: "An error ocurred while trying to delete the users.",
      err
    })
  });
}

// login: Takes the user email and password and validates the data.
exports.login = (req, res, next) => {
  let data = JSON.parse(req.body.data);

  User.findOne({ "email" : data.email }).then(result => {
    // Validate user password
    if(result.password === data.pass){
      res.status(200).json({
        login: true,
        result
      });
    } else {
      res.status(401).json({
        login: false,
        message: "Incorrect email or password."
      });
    }
  }).catch(err => {
    res.status(500).json({
      err
    });
  });
}
*/
