const userRoutes = require("express").Router();
const { fetchAllProducts } = require("../controller/userController");

userRoutes.get("/fetch/shops", (request, response, next) => {
  fetchAllProducts()
    .then((result) => {
      response.json({ products: result, fetched: true });
    })
    .catch((error) => {
      response.json({ error: error, fetched: false });
    });
});
module.exports = userRoutes;
