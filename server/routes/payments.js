const express = require("express");
const moment = require("moment");
const router = new express.Router();

const Order = require("../models/Order");
const jwtMiddleware = require("../middlewares/jwt");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7
  },
  fast: {
    price: 49.98,
    days: 3
  }
};

function shipmentPrice(shipmentOption) {
  //includes the current day to the shipment days option
  let estimated = moment()
    .add(shipmentOption.days, "d")
    .locale("fr")
    .format("LL");
  return { estimated, price: shipmentOption.price };
}

router.post("/shipment", (req, res) => {
  let shipment;
  if (req.body.shipment == "normal") {
    shipment = shipmentPrice(SHIPMENT.normal);
  } else {
    shipment = shipmentPrice(SHIPMENT.fast);
  }
  res.status(200).json({
    success: true,
    shipment: shipment
  });
});

router.post("/", jwtMiddleware, (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);
  stripe.customers
    .create({
      email: req.decoded.email
    })
    .then(customer => {
      return stripe.customers.createSource(customer.id, {
        source: "tok_visa"
      });
    })
    .then(source => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: "usd",
        customer: source.customer
      });
    })
    .then(async charge => {
      let order = new Order();
      let cart = req.body.cart;
      cart.map(product => {
        order.products.push({
          id: product._id,
          quantity: parseInt(product.quantity),
          price: product.price
        });
      });
      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment has been successfully taken into account. "
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        message: error.message
      });
    });
});

module.exports = router;
