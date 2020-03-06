var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  type: { type: String, unique: true, required: true }
});

var Category = mongoose.model("Category", categorySchema);

module.exports = Category;
