const express = require("express");
const contactController = require("../controller/contactController");
const router = express.Router();

router.post("/contact_us",contactController.ContactUs);
router.get("/get_contact_data",contactController.getcontactData);


module.exports = router;
