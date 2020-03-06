const express = require("express");
const router = new express.Router();

const Address = require("../models/Address");
const User = require("../models/User");
const jwtMiddleware = require("../middlewares/jwt");

const axios = require("axios");

router.post("/", jwtMiddleware, (req, res) => {
  const {
    country,
    fullName,
    streetAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    deliverInstructions,
    securityCode
  } = req.body;

  const newAddress = new Address({
    country,
    fullName,
    streetAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    deliverInstructions,
    securityCode,
    user: req.decoded._id
  });

  newAddress.save((err, address) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });
    }
    return res.status(201).send({ success: true, address: address.toObject() });
  });
});

router.get("/", jwtMiddleware, (req, res) => {
  Address.find({ user: req.decoded._id }).exec(function(err, addresses) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    res.status(200).json({ addresses });
  });
});

router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("http://restcountries.eu/rest/v2/all");

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", jwtMiddleware, (req, res) => {
  Address.findById({ _id: req.params.id }).exec(function(err, address) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    res.status(200).json({ address });
  });
});

// router.patch("/:id", jwtMiddleware, (req, res) => {
//   const updatedAddress = { ...req.body };

//   Address.findOneAndUpdate(
//     { _id: req.params.id },
//     { $set: updatedAddress },
//     { new: true }
//   ).exec(function(err, updatedAddress) {
//     if (err)
//       return res
//         .status(500)
//         .json({ message: "The server was unable to complete your request." });

//     res.status(200).json({ updatedAddress });
//   });
// });

router.patch("/:id", jwtMiddleware, async (req, res) => {
  try {
    let updatedAddress = await Address.findOne({
      user: req.decoded._id,
      _id: req.params.id
    });
    if (updatedAddress) {
      if (req.body.country) updatedAddress.country = req.body.country;
      if (req.body.fullName) updatedAddress.fullName = req.body.fullName;
      if (req.body.streetAdress)
        updatedAddress.streetAdress = req.body.streetAdress;
      if (req.body.city) updatedAddress.city = req.body.city;
      if (req.body.state) updatedAddress.state = req.body.state;
      if (req.body.zipCode) updatedAddress.zipCode = req.body.zipCode;
      if (req.body.phoneNumber)
        updatedAddress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliveryInstructions)
        updatedAddress.deliveryInstructions = req.body.deliveryInstructions;
      if (req.body.securityCode)
        updatedAddress.securityCode = req.body.securityCode;

      await updatedAddress.save();

      res.status(200).json({
        success: true,
        message: "Address has been successfully updated."
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete("/:id", jwtMiddleware, (req, res) => {
  Address.findByIdAndDelete({ user: req.decoded._id, _id: req.params.id }).exec(
    function(err, deletedAddress) {
      if (err)
        return res
          .status(500)
          .json({ message: "The server was unable to complete your request." });

      res.status(200).json({ deletedAddress });
    }
  );
});

router.put("/default", jwtMiddleware, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.decoded._id },
    { $set: { address: req.body.id } },
    { new: true }
  ).exec(function(err, updatedAddress) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    res.status(200).json({ updatedAddress });
  });
});

module.exports = router;
