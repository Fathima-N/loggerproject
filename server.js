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
    //NEED TO TEST IF THIS WORKS
  let cookie = req.session.user_id
  if (cookie) {
    knex("logger")
      .where({ token_id: cookie })
      .offset(0)
      .limit(10)
      .then((results) => {
        var templateVars = {
          messages: results
        }
       res.render("index", templateVars);
      })  

    // knex 
    // .select("*")
    // .from("logger")
    // .offset(0)
    // .limit(10)
    // .then((results) => {
    //   var templateVars = {
    //     messages: results
    //   }
    //  res.render("index", templateVars);
    // })  
  } else {
    res.redirect("/login")
  }
});


app.get("/api/logs", (req, res) => {
 // let page = req.query.page;
 let offset = Number(req.query.offset)
 let limit = Number(req.query.limit)
  // let perPage = 10;
  // let limit = perPage;
  // let offset = (page - 1) * perPage
 
  knex 
    .select("*")
    .from("logger")
    .offset(offset)
    .limit(limit)
    .then((results) => {
      console.log(results)
      res.json(results)
    })
})

app.get("/api/all", (req, res) => {
  knex 
  .select("*")
  .from("logger")
  .then((results) => {
    res.json(results)
  })  
});

app.get("/api/info", (req, res) => {
  knex("logger")
      .where({severity: 'info'})
      .then((results) => {
        res.json(results)
      })
});

app.get("/api/warning", (req, res) => {
  knex("logger")
    .where({severity: 'warning'})
    .then((results) => {
      res.json(results)
    })
});

app.get("/api/error", (req, res) => {
  knex("logger")
    .where({severity: 'error'})
    .then((results) => {
      res.json(results)
    })
})

app.get("/api/newest", (req, res) => {
  knex("logger")
    .orderBy('created_at', 'desc')
    .then((results) => {
      res.json(results)
    })
});

app.get("/api/oldest", (req, res) => {
  knex("logger")
    .orderBy('created_at', 'asc')
    .then((results) => {
      res.json(results)
    })
});


app.get("/api/serverQueries", (req, res) => {
  /*going to be req.query because the get request is like a URL */
  let serverQuery = req.query.server
  console.log(serverQuery)
  knex("logger")
    .where({server_name: serverQuery})
    .then((results) => {
        res.json(results)
    })
});

app.get("/api/tagQueries", (req, res) => {
  /*going to be req.query because the get request is like a URL */
  let tagQuery = req.query.tag
  knex("logger")
    .where({tag: tagQuery})
    .then((results) => {
      res.json(results)
    })
});

app.get("/api/messageQueries", (req, res) => {
  /*going to be req.query because the get request is like a URL */
  let words = req.query.message.split(" ")
  const queryBuilder = knex("logger")
    
    words.forEach(function(word) {
      queryBuilder.whereRaw('message LIKE ?', ['%' + word + '%'])
    }) 
    queryBuilder.then((results) => {
        res.json(results)
      })
});


app.post("/api/:token", (req, res) => {
  let token = req.body.token;

  if (token){
    if (req.body.severity && req.body.server_name && req.body.message || 
        req.body.severity && req.body.server_name && req.body.message && req.body.tag) {

      if (req.body.severity === "warning" ||
          req.body.severity === "error" ||
          req.body.severity === "info" 
        ) {

        knex('logger')
          .insert({token_id: req.body.token, severity: req.body.severity, server_name: req.body.server_name, message: req.body.message, tag: req.body.tag})
          .then((results) => {
            res.redirect("/api/:token/data")
          })
      } else {
        //NEED TO SHOW THE LOG RESULT HERE
        res.status(400).send('HTTP 400: Bad Request. Please re-label severity levels according to one of the following: warning, info or error.')
      }
    } else {
      res.status(400).send('HTTP 400: Bad Request. Please input the required parameters.')
    };
  }
  else {
    res.status(401).send('HTTP 401: Unauthorized. Please provide your token to post a request.')
  }
    
});

app.get("/api/:token/data", (req, res) => {
  //show all logs that belong to the api key in json format --I CANT BECAUSE THERES NO RELATION OF KEYS TO LOGGER TABLE. 
  res.send('works')
})


app.get("/register", (req, res) => {
   res.render("register")
});


app.post("/register/:user", (req, res) => {
  // console.log(req.body);
  
  // /* AUTHENTICATING NEW REGISTRATIONS */

  // let company = req.body.company;
  // let email = req.body.email;
  // let password = req.body.password;

  // let userExists = false;

  // if (email) {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       for (let key in results) {
  //         if (email === results[key].email) {
  //           userExists = true;
  //         }
  //       } 

  //       if (userExists) {
  //         res.send("/login")
  //       } else {
  //         knex('users')
  //           .insert({ company: req.body.company, email: req.body.email, password: req.body.password, tag: req.body.token, token: req.body.token })
  //           .returning(['id', 'company'])
  //           .then((results) => {
  //             var userID = results[0].id
  //             var company = results[0].company
  //             // var templateVars = {
  //             //   messages: results
  //             // }
  //             req.session.user_id = userID
  //             res.send("/")
  //           })
  //       }
  //     })
  // };

  // if (email === "" || password === "") {
  //   res.send("register")
  // }

  // res.send('OK')

});

// LOGIN ROUTE
app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  let token = req.body.token;
  let userExists = false;

   knex
    .select("*")
    .from("users")
    .then((results) => {
      for (let key in results) {
        if (token === results[key].token) {
          userExists = true
          console.log(userExists)
          let userID = token
          req.session.user_id = userID;
          res.send("/")
        } else {
          console.log(userExists)
          res.status(401).send('nope')
        }
      }

      if (userExists) {
        res.redirect("/")
      }
      
    }) 
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
