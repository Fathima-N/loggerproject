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

const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "session",
    keys: ["my secret password"]
  })
);

app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
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

    if (req.body.severity === "warning" ||
        req.body.severity === "error" ||
        req.body.severity === "info" 
      ) {
      res.status(200).send('parameters are good');

      knex('logger')
        .insert({severity: req.body.severity, server_name: req.body.server_name, message: req.body.message, tag: req.body.tag})
        .then((results) => {
          res.status(200).send('inserted into db')
        })
    } else {
      res.status(200).send('Please re-label severity level according to one of the following: warning, info or error.')
    }
  } else {
    res.status(200).send('Please input the required parameters.')
  };

  res.send('Complete')

});

app.get("/api/data", (req, res) => {
  res.send("got the data")
  //need to get full list of logs belonging to tokens here
});


app.get("/register", (req, res) => {
   res.render("register")
});


app.post("/register/:user", (req, res) => {
  console.log(req.body);
  
  /* AUTHENTICATING NEW REGISTRATIONS */

  let company = req.body.company;
  let email = req.body.email;
  let password = req.body.password;

  let userExists = false;

  if (email) {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        for (let key in results) {
          if (email === results[key].email) {
            userExists = true;
          }
        } 

        if (userExists) {
          res.send("/login")
        } else {
          knex('users')
            .insert({ company: req.body.company, email: req.body.email, password: req.body.password, tag: req.body.token, token: req.body.token })
            .returning(['id', 'company'])
            .then((results) => {
              var userID = results[0].id
              var company = results[0].company
              // var templateVars = {
              //   messages: results
              // }
              req.session.user_id = userID
              res.send("/")
            })
        }
      })
  };

  if (email === "" || password === "") {
    res.send("register")
  }

  res.send('OK')

});

// LOGIN ROUTE
app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
