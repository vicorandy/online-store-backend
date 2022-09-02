const { registerUser, loginUser } = require("../contollers/users");
const express = require("express");
const userRouter = express.Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/register").post(registerUser);

module.exports = userRouter;
