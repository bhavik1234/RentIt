//1) Import modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();
const route = require("./routes/user");
const electronicRoutes = require('./routes/electronic');
//Connect to MongoDb
//Contact list will be the name of database
mongoose.connect("mongodb://localhost:27017/contactlist");

mongoose.connection.on("connected", () => {
  console.log("Connected to database mongodb at default port 27017");
});

mongoose.connection.on("error", err => {
  if (err) {
    console.log("Error in datbase connection", err);
  }
});
//port no
const port = 3000;

//add middleware
app.use(express.static(__dirname));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/user", route);
app.use("/api/electronic", electronicRoutes);


app.listen(port, () => {
  console.log("Server started at port :", port);
});
