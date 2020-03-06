var mongoose = require("mongoose");
const deepPopulate = require("mongoose-deep-populate")(mongoose);
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  estimatedDelivery: { type: String },
  products: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      price: { type: Number }
    }
  ],
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

orderSchema.plugin(deepPopulate);

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;
