"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 3000;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const usersRoutes = require("./routes/users");

app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set("view engine", "ejs");

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));


app.use(function timeLog(req, res, next) {
  next();
});
  
app.get("/", (req, res) => {
  knex 
  .select("*")
  .from("logger")
  .then((results) => {
    var templateVars = {
      messages: results
    }
   res.render("index", templateVars);
  })   
});

app.post("/api/data", (req, res) => {



  if (req.body.severity && req.body.server_name && req.body.message || 
      req.body.severity && req.body.server_name && req.body.message && req.body.tag) {
    console.log('good')
    if (req.body.severity === "warning" ||
        req.body.severity === "error" ||
        req.body.severity === "info" 
      ) {
      console.log('it matches')
      knex('logger')
        .insert({severity: req.body.severity, server_name: req.body.server_name, message: req.body.message, tag: req.body.tag})
        .then((results) => {
          console.log('inserted into db')
        })
    } else {
      console.log('Please re-label severity level according to one of the following: warning, info or error.')
    }
  } else {
    console.log('Please input the required parameters.')
  }

})

app.get("/api/data", (req, res) => {
  res.send("got the data")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {
  res.render("register")
})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
