const { model, Schema } = require("mongoose");

const notificationSchema = new Schema({
  action: { type: String, required: true },
  date: { type: Date, required: true },
  read: { type: Boolean, required: true },
});

const notifications = model("notifications", notificationSchema);
module.exports = notifications;
