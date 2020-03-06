const express = require("express");
const router = new express.Router();

const User = require("../models/User");

const jwtMiddleware = require("../middlewares/jwt");

router.get("/", jwtMiddleware, (req, res) => {
  User.find().exec(function(err, users) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    res.status(200).json({ users });
  });
});

module.exports = router;
