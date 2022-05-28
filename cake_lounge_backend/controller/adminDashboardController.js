const { terminal } = require("terminal-kit");
//Importing models
const shop = require("../models/shops");
const order = require("../models/orders");
const notifications = require("../models/notifications");

//fetches all shops with rank 1
async function getBestShops() {
  return new Promise((resolve, reject) => {
    try {
      shop
        .find({ rank: 1, author: 1922 })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      terminal.bold.red("[Cake Lounge Bakcend] ", error);
    }
  });
}
//fetches all paid orders
async function getSales() {
  return new Promise((resolve, reject) => {
    try {
      order
        .find({ status: "paid", author: 1922 })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      terminal.bold.red("[Cake Lounge] " + error);
    }
  });
}
//fethes all users
async function getAllUsers() {
  return new Promise((resolve, reject) => {
    try {
      shop
        .find({ author: 1922 })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      terminal.bold.red("[Cake Lounge backend] ", error);
    }
  });
}
//blocks a single user when the id is provided
async function blockUser(user) {
  return new Promise((resolve, reject) => {
    try {
      shop.updateOne(
        { _id: user._id, author: 1922 },
        { blockedStatus: !user.blockedStatus },
        (error, docs) => {
          if (!error) {
            addNotificationForUserBlock();
            resolve("Shop Updated");
          } else {
            reject(error);
          }
        }
      );
    } catch (error) {
      terminal.bold.red("[Cake Lounge Backend] ", error);
    }
  });
}
//deletes a single user when id is provided
async function deleteUser(user) {
  return new Promise((resolve, reject) => {
    try {
      shop
        .deleteOne({ _id: user._id, author: 1922 })
        .then((result) => {
          addNotificationForDeleteUser();
          terminal.bold.blue("[Cake Lounge Backend] ", result);
          resolve(result);
        })
        .catch((error) => {
          terminal.bold.red("[Cake Lounge Backend] ", error);
          reject(error);
        });
    } catch (error) {
      terminal.bold.red("[Cake Lounge Backend] ", error);
    }
  });
}

async function addNotificationForUserBlock() {
  const newNotification = new notifications({
    action: "You blocked a user",
    date: new Date(),
    read: false,
  });
  try {
    await notifications
      .insertMany(newNotification)
      .then((result) => {
        terminal.bold.blue("[Cake Lounge Backend]: Notification added");
      })
      .catch((error) => {
        terminal.bold.blue(
          "[Cake Lounge Backend]: error while adding notification ",
          error
        );
      });
  } catch (error) {
    terminal.bold.red("[Cake Lounge Backend] ", error);
  }
}
async function addNotificationForDeleteUser() {
  const newNotification = new notifications({
    action: "You deleted a user",
    date: new Date(),
    read: false,
  });
  try {
    await notifications
      .insertMany(newNotification)
      .then((result) => {
        terminal.bold.blue("[Cake Lounge Backend]: Notification added");
      })
      .catch((error) => {
        terminal.bold.blue(
          "[Cake Lounge Backend]: error while adding notification ",
          error
        );
      });
  } catch (error) {
    terminal.bold.red("[Cake Lounge Backend] ", error);
  }
}
module.exports = {
  getBestShops,
  getSales,
  getAllUsers,
  blockUser,
  deleteUser,
};
