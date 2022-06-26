"use strict";
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const pool = require("../config/connectDB");
const userRoute = require("../routes/web");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// REST
app.set("view engine", "ejs");
app.use(express.json());
app.use("/", userRoute);

// Connect DB
pool.connect((err) => {
  if (err) throw err;
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
