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
  // rendering data from the server. storing the data in the variable templateVars
  // let templateVars = {
  //   messages: [ 
  //     {
  //       severity: "info",
  //       timestamp: "5 hours ago",
  //       sever_name: "localhost",
  //       message: "all is good"
  //     }
  //   ]
  // }

 //rendering data from the database. Knex is using promises - first it's making a query, then it's returning the results, then storing it in the variable templateVars
 //if we first store knex in the tempalteVars variable, it's not based on a promise anymore and won't show anything. 
  knex 
  .select("*")
  .from("logger")
  .then((results) => {
    var templateVars = {
      messages: results
    }
   res.render("index", templateVars);
  })   
  
  // console.log(templateVars)

});

app.post("/api/data", (req, res) => {
  //WHEN INSERTING data, i have to use a 'then' promise to actually execute the insert. 
  console.log(req.body.severity)
  knex('logger')
    .insert({severity: req.body.severity, server_name: req.body.server_name, message: req.body.message})
    .then((results) => {
      console.log('inserted into db')
    })
})

app.get("/api/data", (req, res) => {
  res.send("got the data")
})




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
