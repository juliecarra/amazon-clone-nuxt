const express = require("express");
const router = new express.Router();

const Owner = require("../models/Owner");
const uploader = require("../config/cloudinary");

router.post("/", uploader.single("image"), (req, res) => {
  const { name, about } = req.body;

  const { image } = req.file;

  const newOwner = new Owner({
    name,
    about,
    image
  });

  if (req.file) newOwner.image = req.file.secure_url;

  newOwner.save((err, owner) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });
    }
    return res.status(201).send({ success: true, owner: owner.toObject() });
  });
});

router.get("/", (req, res) => {
  Owner.find().exec(function(err, owners) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    res.status(200).json({ owners });
  });
});

module.exports = router;
