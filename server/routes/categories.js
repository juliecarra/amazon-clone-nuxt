const express = require("express");
const router = new express.Router();

const Category = require("../models/Category");

router.post("/", (req, res) => {
  const { type } = req.body;

  const newCategory = new Category({
    type
  });

  newCategory.save((err, category) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });
    }
    return res
      .status(201)
      .send({ success: true, category: category.toObject() });
  });
});

router.get("/", (req, res) => {
  Category.find().exec(function(err, categories) {
    if (err)
      return res
        .status(500)
        .json({ message: "The server was unable to complete your request." });

    res.status(200).json({ categories });
  });
});

module.exports = router;
