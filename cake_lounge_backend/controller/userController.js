const { terminal } = require("terminal-kit");
//importing models
const products = require("../models/products");

const fetchAllProducts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await products.find({}).then((result) => {
        resolve(result);
      });
    } catch (error) {
      terminal.red.bold("[Cake Lounge Backend] ", error);
      reject(error);
    }
  });
};

module.exports = { fetchAllProducts };
