const express = require("express");
const contactController = require("../controller/contactController");
const router = express.Router();

router.post("/contact_us",contactController.ContactUs);
module.exports = router;
