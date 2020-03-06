var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  headline: { type: String },
  body: { type: String },
  rating: { type: Number },
  image: { type: String },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
