const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");


//load routings
const userRoutes = require('./routers/user')


//.....
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//configure header htpp
//....

// router basic
//...
app.use( `/api/${API_VERSION}`, userRoutes);


module.exports = app;
