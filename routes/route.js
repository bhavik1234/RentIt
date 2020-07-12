const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

//Get contact
router.get("/contact", (req, res, next) => {
  //Contact is the collection in database.
  Contact.find(function(err, contacts) {
    res.json(contacts);
  });
});

//add contact
router.post("/contact", (req, res, next) => {
  let newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone
  });
  newContact.save((err, contact) => {
    if (err) {
      res.json({ msg: "Failed to add contact" });
    } else {
      res.json({ msg: "Contact added successully" });
    }
  });
});

//Delete contact
router.delete("/contact/:id", (req, res, next) => {
  Contact.deleteOne({ _id: req.params.id }, (err, response) => {
    if (err) {
      res.json({ msg: "Failed to delete contact" });
    } else {
      res.json({ msg: "Deleted" });
    }
  });
});

module.exports = router;
