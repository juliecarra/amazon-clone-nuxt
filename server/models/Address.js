var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  country: { type: String },
  fullName: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  phoneNumber: { type: String },
  deliverInstructions: { type: String },
  securityCode: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

var Address = mongoose.model("Address", addressSchema);

module.exports = Address;
