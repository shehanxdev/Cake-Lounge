const Router = require("express").Router();
const shop = require("../models/shops");

Router.get("/add", (req, res, next) => {
  const name = req.query.name;
  const password = req.query.password;
  let newShop = new shop({
    shopID: "test",
    name: "nametest",
    password: "pass",
    contact: { mobile: 0999, email: "none" },
    ownerID: 22222,
    rank: 1,
    blockedStatus: false,
  });
  newShop.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("done");
    }
  });
});

module.exports = Router;
