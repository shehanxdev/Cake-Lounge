const adminRoutes = require("express").Router(); //Create a router
const jwt = require("jsonwebtoken");
const express = require("express");
const asynchandler = require("express-async-handler");
const app = express();
//controllers
const adminLogin = require("../controller/adminAuthController");
const {
  getBestShops,
  getSales,
  getAllUsers,
  blockUser,
  deleteUser,
} = require("../controller/adminDashboardController");
const {
  fetchLogs,
  deleteLog,
  createLog,
  updateLog,
} = require("../controller/adminLogController");
const {
  fetchNotifications,
} = require("../controller/adminNotificationController");
//env variables
const env = require("../config/config");
const { request, response } = require("express");

const terminal = require("terminal-kit").terminal;
app.use(express.json());

//route which handles admin login
adminRoutes.post("/login", (req, res, next) => {
  adminLogin(req, res, next);
});
//this route handles the overview section of the dashboard
adminRoutes.post("/dashboard", async (request, response, next) => {
  const { token, admin } = request.body;
  let returnShops;
  let returnOrders;
  jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      terminal.bold.red("[Cake Lounge Backend] ", err.message);
      response.json({ message: err.message, logged: false });
      return;
    }
  });
  await getBestShops()
    .then((res) => {
      returnShops = res;
    })
    .catch((err) => {
      terminal.bold.red("[Cake Lounge] ", err);
    });
  await getSales()
    .then((result) => {
      returnOrders = result;
    })
    .catch((err) => {
      terminal.bold.red("[Cake Lounge] ", err);
    });

  response.json({ shops: returnShops, orders: returnOrders });
});

//This route handles the user section of the dashboard
adminRoutes.post("/dashboard/users", async (request, response, next) => {
  let allShops;
  await getAllUsers()
    .then((result) => {
      allShops = result;
    })
    .catch((error) => {
      terminal.bold.red("[Cake Lounge Backend] ", error);
    });

  response.json({ resultedAllShops: allShops });
});

//This route blocks/unblocks a user in the user section of the dashboard
adminRoutes.post("/dashboard/users/edit", async (request, response) => {
  const shop = request.body.user;
  await blockUser(request.body.user)
    .then((result) => {
      terminal.bold.blue("[Cake Lounge Backend] ", result);
      response.json({ message: "Edited" });
    })
    .catch((error) => {
      terminal.bold.red("[Cake Lounge Backend] ", error);
    });
});
//this route deletes a user in the user section of the dashboard
adminRoutes.post("/dashboard/users/delete", async (request, response) => {
  const shop = request.body.user;
  await deleteUser(request.body.user)
    .then((result) => {
      terminal.bold.blue("[Cake Lounge Backend] ", result);
    })
    .catch((eeror) => {
      terminal.bold.red("[Cake Lounge Backend] ", error);
    });
});

//Thi route fetches all the logs for the Log section of the admin dashboard
adminRoutes.post("/log/fetchLogs", async (request, response, next) => {
  await fetchLogs()
    .then((result) => {
      response.json({ logs: result });
    })
    .catch((error) => {
      terminal.bold.red("[Cake Lounge Backend ]", error);
    });
});

//this route will delete a given log using its Object id
adminRoutes.post("/log/delete", async (request, response, next) => {
  await deleteLog(request.body.log)
    .then((result) => {
      response.json({ result: result, deleted: true });
    })
    .catch((error) => {
      response.json({ error: error, deleted: false });
      terminal.bold.red("[Cake Lounge Backend ]", error);
    });
});

adminRoutes.post("/log/create", async (request, response, next) => {
  await createLog(request.body.log.log)
    .then((result) => {
      response.json({ result: result, saved: true });
    })
    .catch((error) => {
      response.json({ error: error, saved: false });
      terminal.bold.red("[Cake Lounge Backend ]", error);
    });
});

adminRoutes.post("/log/update", async (request, response, next) => {
  await updateLog(request.body.log)
    .then((result) => {
      response.json({ result: result, updated: true });
    })
    .catch((error) => {
      response.json({ error: error, updated: false });
    });
});

adminRoutes.post("/notifications/fetch", async (request, response, next) => {
  await fetchNotifications()
    .then((result) => {
      response.json({ notifications: result, fetched: true });
    })
    .catch((error) => {
      response.json({ fetched: false, error: error });
    });
});
module.exports = adminRoutes;
