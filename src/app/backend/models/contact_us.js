const mongoose = require("mongoose");
const contact_usSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const contact_us = mongoose.model("contact_us", contact_usSchema);
module.exports = contact_us;
