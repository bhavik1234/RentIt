const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

//Get user
//Get contact
router.get("/user", (req, res, next) => {
  //Contact is the collection in database.
  User.find(function(err, data) {
    res.json(data);
  });
});

//Add a new user
router.post("/register", (req, res) => {
  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  user.save((err, doc) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Error in user registration", error: err });
    } else {
      res.status(200).json({
        message: "User registered successfully",
        user: doc
      });
    }
  });
});

//validate user
//POST /api/user/login
router.post("/login", (req, res) => {
  var user = new User(req.body);
  User.authenticate(user.username, user.password, function(err, user) {
    if (err) {
      res
        .status(404)
        .json({ message: "User not exists", error: err, loginSuccess: false });
    } else {
      res
        .status(200)
        .json({ message: "Login success", user: user, loginSuccess: true });
    }
  });
});

module.exports = router;
