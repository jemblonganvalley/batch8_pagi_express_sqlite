const { createUser, readUser } = require("../models/userModel");
const express = require("express");
const user = express.Router();

user.post("/", (req, res) => {
  createUser(req.body)
    .then((result) => {
      if (result.length > 0) {
        res.status(201).json({
          mag: "success register",
          result: result,
        });
      } else {
        res.status(401).json({
          msg: "email sudah terpakai..",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

user.get("/", (req, res) => {
  readUser()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "error",
        error: err,
      });
    });
});

module.exports = user;
