const { terminal } = require("terminal-kit");
//importing models
const logs = require("../models/adminLogs");
const notifications = require("../models/notifications");

//fetch all Logs to the Log section of the s=admin dashboard
async function fetchLogs() {
  return new Promise((resolve, reject) => {
    try {
      logs
        .find()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          terminal.bold.red(error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
    }
  });
}

//delete Log
async function deleteLog(log) {
  return new Promise(async (resolve, reject) => {
    try {
      await logs
        .deleteOne({ _id: log._id })
        .then((result) => {
          addNotificationForLogDelete();
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

async function createLog(log) {
  const newLog = new logs({
    content: log.content,
    date: log.date,
    flag: log.flag,
  });

  return new Promise(async (resolve, reject) => {
    try {
      await logs
        .insertMany(newLog)
        .then((result) => {
          addNotificationForLogCreate();
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

async function updateLog(log) {
  return new Promise(async (resolve, reject) => {
    try {
      await logs
        .findOneAndUpdate(
          { _id: log._id },
          {
            $set: {
              content: log.content,
            },
          },
          { new: true }
        )
        .then((result) => {
          if (result) {
            addNotificationForLogUpdate();
            resolve(result);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      terminal.bold.red("[Cake Lounge Backend] ", error);
    }
  });
}
async function addNotificationForLogUpdate() {
  const newNotification = new notifications({
    action: "You updated a log",
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

async function addNotificationForLogDelete() {
  const newNotification = new notifications({
    action: "You deleted a log",
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

async function addNotificationForLogCreate() {
  const newNotification = new notifications({
    action: "You cretaed a log",
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

module.exports = { fetchLogs, deleteLog, createLog, updateLog };
