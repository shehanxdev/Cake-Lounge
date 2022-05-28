const ENVConfigResult = require("dotenv").config({
  path: __dirname + "/config.env",
}); //this contant variable ENVConfigResult holds the result after loading .env file into process
var terminal = require("terminal-kit").terminal; //terminal styling module. Not compulsory for the app
var env;

//Following if statemt is to check whether the ENV variables are parsed correctly
if (ENVConfigResult.error) {
  terminal.bold.red("[Cake_lounge] ", ENVConfigResult.error, "\n");
  env = null;
} else {
  terminal.bold.blue("[Cake_lounge] ENV variables parsed correctly\n");
  env = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  };
}

module.exports = env;
