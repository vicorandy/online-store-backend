const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");
const bcrypt = require("bcryptjs");

const registerUser = async function (req, res) {
  const user = await User.create(req.body);
  const token = await user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, userId: user._id }, token });
};

const loginUser = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide an email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError(`Sorry no user with email:${email}`);
  }

  const isPassWordCorrect = await user.comparePassword(password);
  if (!isPassWordCorrect) {
    throw new BadRequestError("invalid password");
  }

  const token = await user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, userId: user._id }, token });
};

module.exports = { registerUser, loginUser };
