const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var User = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }
});

//Hash the password before saving
User.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

//authenticate user from database
User.statics.authenticate = function(username, password, callback) {
  let user = this;
  user.findOne({ username: username }).exec(function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
  
    bcrypt.compare(password, user.password, function(error, result) {
      console.log("inside bcrypt", result);
      if (result === true) {
        return callback(null, user);
      } else {
       var error = new Error("Password incorrect.");
       error.status = 401;
        return callback(error);
      }
    });
  });
};
module.exports = mongoose.model("User", User);
