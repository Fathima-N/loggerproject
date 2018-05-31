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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
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
    let templateVars = {
      messages: results
    }
   res.render("index", templateVars);
  })   
  
  // console.log(templateVars)

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
