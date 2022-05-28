const Admin = require("../models/admin");
const notifications = require("../models/notifications");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/config");
const terminal = require("terminal-kit").terminal;

//jwt secret
const JWT_SECRET = env.JWT_SECRET;

async function adminLogin(req, res, next) {
  var admin, isMatch;
  const { email, password } = req.body;
  try {
    //Search for the user
    await Admin.findOne({ email }).then((user) => {
      if (!user) throw Error("User does not exist");
      else {
        admin = user;
      }
      //this part compares the hashed password in the database with the user entered password
      bcrypt
        .compare(password, admin.password)
        .then(function (result) {
          if (result) {
            isMatch = result;
          } else {
            throw Error("password does not match");
          }
        })
        .then(() => {
          //Generate JWT token
          if (isMatch) {
            //signing the token
            const JWTToken = jwt.sign(
              { name: admin.name, email: admin.email, role: admin.role },
              JWT_SECRET,
              { expiresIn: "10h" }
            );
            //inserting the token to the response and saving details in the localStorage
            const details = {
              message: "Login Success",
              token: JWTToken,
              administrator: admin,
            };
            //adding notification
            addNotificationForLogin();
            res.json(details);
          }
        })
        .catch((error) => {
          terminal.bold.red("[Cake Lounge] " + error + "\n");
        });
    });
  } catch (error) {
    //attached the error message to the response
    res.json({ message: error });
    terminal.bold.red("[Cake Lounge] " + error + "\n");
  }
}

async function addNotificationForLogin() {
  const newNotification = new notifications({
    action: "You logged in successefully",
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
        terminal.bold.red(
          "[Cake Lounge Backend]: error while adding notification ",
          error
        );
      });
  } catch (error) {
    terminal.bold.red("[Cake Lounge Backend] ", error);
  }
}
module.exports = adminLogin;
