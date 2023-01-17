const axios = require("axios");
const express = require("express");
const port = 3000;
const app = express();
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



let counter = 0; // inner implmentation
stupidDB = {}; // initialize our dumb database

// GET Requests

app.get("/", (req, res) => {
  // homepage
  res.send("Welcome to stupidDB API");
});

app.get("/info/index", (req, res) => {
  // get the current index
  res.send({ counter: counter });
});

app.get("/info/capacity", (req, res) => {
  // get the capacity
  res.send({ capacity: Object.keys(stupidDB).length });
});

app.get("/db/all", (req, res) => {
  // get all items from the db
  res.send(stupidDB);
});

app.get("/db/:id", (req, res) => {
  // get a certain item from the db
  const id = req.params.id;
  if (id in stupidDB) {
    res.send(stupidDB[id]);
  } else {
    res.send({ error: "no object found with this id" });
  }
});

