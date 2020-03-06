const express = require("express");
const router = new express.Router();

const jwt = require("jsonwebtoken");
const jwtMiddleware = require("../middlewares/jwt");

const User = require("../models/User");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password)
    return res
      .status(422)
      .json({ message: "Provide an email and a password." });

  User.findOne({ email }).exec(function(err, user) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    if (user) return res.status(409).json({ message: "User already exists." });

    user = new User({
      name,
      email,
      password
    });

    user.save();
    let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 604800 // 1 week
    });
    return res.status(201).send({
      success: true,
      token: token,
      message: "New user is successfully registered."
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec(function(err, user) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    if (!user) return res.status(403).json({ message: "User does not exist." });

    if (user.comparePassword(password)) {
      jwt.sign(
        user.toObject(),
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          return res
            .status(200)
            .send({ success: true, user: user.toObject(), token });
        }
      );
    } else {
      return res.status(403).json({ message: "Wrong password." });
    }
  });
});

router.get("/user", jwtMiddleware, (req, res) => {
  User.findById({ _id: req.decoded._id })
    .populate("address")
    .exec(function(err, user) {
      if (err)
        return res
          .status(500)
          .json({ message: "The server was unable to complete your request." });

      res.status(200).json(user);
    });
});

router.put("/user", jwtMiddleware, async (req, res) => {
  const user = req.body;

  User.findByIdAndUpdate({ _id: req.decoded._id }, user).exec(function(
    error,
    updatedUser
  ) {
    if (error)
      res.status(500).json({
        success: false,
        message: "The server was unable to complete your request."
      });

    if (updatedUser)
      res.status(200).json({
        success: true,
        message: "Profile has been updated."
      });
  });
});

router.post("/logout", (req, res, next) => {
  res.status(200).json({ message: "You are logged out." });
});

module.exports = router;
