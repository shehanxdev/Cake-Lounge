const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //cross origin resource sharing
var terminal = require("terminal-kit").terminal; //terminal styling module. Not compulsory for the app
//importing user routes
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/tempshops");
const userRoutes = require("./routes/userRoutes");
const { urlencoded } = require("body-parser");
const env = require("./config/config");

const app = express();

//PORT and MongoDB URL
const PORT = env.PORT || 8080;
const MONGODB_URL = env.MONGODB_URL;

//connecting to the database
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    terminal.bold.blue(
      "[Cake_lounge] Connected to the database with mongoose\n"
    );
  })
  .catch((error) => {
    terminal.bold.red("[Cake_lounge]", error);
  });

//app.use
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

//mounting routes
app.use("/admin", adminRoutes);
app.use("/shops", shopRoutes);
app.use("/user", userRoutes);

//default get request
app.get("/", (req, res) => {
  res.send("Default page");
});

//Satrting the server
const server = app.listen(PORT, () => {
  terminal.bold.blue(
    `[Cake_lounge] Server is up and running on port ${PORT}\n`
  );
});
