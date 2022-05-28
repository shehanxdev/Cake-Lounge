const { terminal } = require("terminal-kit");
//importing models
const notifications = require("../models/notifications");

async function fetchNotifications() {
  return new Promise(async (resolve, rejects) => {
    try {
      await notifications
        .find()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      terminal.bold.red("[Cake Lounge Backend] ", error);
    }
  });
}

module.exports = { fetchNotifications };
