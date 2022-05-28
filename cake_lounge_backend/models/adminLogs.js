const { Schema, model } = require("mongoose");

const logsSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
});

const logs = model("adminlogs", logsSchema);
module.exports = logs;
