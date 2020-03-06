var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ownerSchema = new Schema({
  name: { type: String },
  about: { type: String },
  image: { type: String }
});

var Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
