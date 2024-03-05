const helper = require("../config/helper");
const contact_us = require("../models/contact_us");
const { Validator } = require('node-input-validator');

const ContactUs = async (req, res) => {
    try {
      const v = new Validator(req.body, {
        name: "string|required",
        email: "string|required|email",
        phone: "integer|required",
        message: "string|required",
        // country_code: "string|required",
      });
      const value = JSON.parse(JSON.stringify(v));
      const errorResponse = await helper.checkValidation(v);
      if (errorResponse) {
        return helper.error403(res, errorResponse);
      }
      const ContactSupport = await contact_us.create({ ...value.inputs });
      return helper.success(res,"Message Sent Successfully",ContactSupport);
    } catch (err) {
      return helper.error400(res, err.message);
    }
  };
  const getcontactData = async (req, res) => {
    try {
      const ContactSupport = await contact_us.find();
      return helper.success(res,"Get data successfully",ContactSupport);
    } catch (err) {
      return helper.error400(res, err.message);
    }
  };
module.exports = {
    ContactUs,
    getcontactData
}