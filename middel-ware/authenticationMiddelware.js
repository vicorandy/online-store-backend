const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("../errors/index");

const authenticateUser = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId } = payLoad;
    req.user = { username, userId };
    next();
  } catch (error) {
    throw new AuthenticationError(
      "you are not authorised to access this route"
    );
  }
};

module.exports = authenticateUser;
