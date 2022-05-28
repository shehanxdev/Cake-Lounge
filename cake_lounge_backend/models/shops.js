const { Schema, model } = require("mongoose");

const shopSchema = new Schema({
  shopID: {
    type: String,
    required: true,
  },
  author: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Object,
    required: true,
  },
  appearance: {
    type: Object,
    required: false,
  },
  ownerID: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  blockedStatus: {
    type: Boolean,
    required: true,
  },
});

const shops = model("shops", shopSchema);
module.exports = shops;
