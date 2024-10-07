const route = require("express").Router();
const controllers = require("../controllers/comman_controller");
const verifyToken = require("../middlewares/middle_ware");
const {
  requestLogger,
  validateRequestBody,
} = require("../middlewares/middle_ware");

route.post("/inseruser", validateRequestBody, controllers.insertUser);
route.post("/login", validateRequestBody, controllers.loginUser);

module.exports = route;
