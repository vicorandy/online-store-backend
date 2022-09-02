const express = require("express");
const authenticateUser = require("../middel-ware/authenticationMiddelware");
const paymentRouter = express.Router();

const {
  initailizingPayment,
  executePayment,
  cancelPayment,
} = require("../contollers/payment");

paymentRouter.route("/pay").post(authenticateUser, initailizingPayment);
paymentRouter.route("/success").get(executePayment);
paymentRouter.route("/cancel").get(cancelPayment);

module.exports = paymentRouter;
