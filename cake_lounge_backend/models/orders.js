const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderID: {
    type: String,
    required: true,
  },
  author: {
    type: Number,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paidOn: {
    type: Date,
  },
  due: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const order = model("orders", orderSchema);
module.exports = order;
