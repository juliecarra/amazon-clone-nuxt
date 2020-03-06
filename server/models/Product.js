var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  price: { type: Number },
  stockQuantity: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "Owner" }
});

productSchema.virtual("averageRating").get(function() {
  if (this.reviews.length > 0) {
    let sum = this.reviews.reduce((total, review) => {
      console.log("Review", review);
      return total + review.rating;
    }, 0);

    return sum / this.reviews.length;
  }
  return 0;
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
