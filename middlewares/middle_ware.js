// middleware.js
const colors = require("colors");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  console.log(
    `${req.method} request to ${req.url} at ${new Date().toISOString()}`.yellow
  );
  next();
};

const validateRequestBody = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email are required",
    });
  } else if (!password) {
    return res.status(400).send({
      success: false,
      message: "Password are required",
    });
  } else {
    next();
  }
};
const JWT_SECRET = "AnandSingh";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const split = token.split(" ");
    console.log(`split token ${split[1]}`);
    const tokens = split[1];
    const decoded = jwt.verify(tokens, JWT_SECRET);
    req.user_id = decoded.id;
    console.log(`Decoded User: ${req.user_id}`);
    next();
  } catch (error) {
    console.log(error.message, colors.bgRed.white);
    res.status(400).send({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { requestLogger, validateRequestBody, verifyToken };
