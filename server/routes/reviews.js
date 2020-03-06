const express = require("express");
const router = new express.Router();

const Product = require("../models/Product");
const Review = require("../models/Review");

const jwtMiddleware = require("../middlewares/jwt");

const uploader = require("../config/cloudinary");

router.post(
  "/product/:id",
  [jwtMiddleware, uploader.single("image")],
  (req, res) => {
    const { headline, body, rating } = req.body;

    const image = req.file;

    const newReview = new Review({
      headline,
      body,
      rating,
      image,
      user: req.decoded._id,
      product: req.params.id
    });

    if (req.file) newReview.image = req.file.secure_url;

    Product.update({ $push: { reviews: newReview._id } });

    newReview.save((err, review) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "The server was unable to complete your request." });
      }
      return res.status(201).send({ success: true, review: review.toObject() });
    });
  }
);

router.get("/product/:id", async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.id
    })
      .populate("user")
      .exec();
    res.status(200).json({
      success: true,
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
