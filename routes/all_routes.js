const route = require("express").Router();
const controllers = require("../controllers/comman_controller");
const mastercontroller = require("../controllers/master_controller");

const {
  requestLogger,
  validateRequestBody,
  verifyToken,
} = require("../middlewares/middle_ware");

route.post("/inseruser", validateRequestBody, controllers.insertUser);
route.post("/login", validateRequestBody, controllers.loginUser);
//master
route.post("/postcateogy", verifyToken, mastercontroller.insertcatogrys);
route.get("/getcateory", verifyToken, mastercontroller.getcategory);
route.post("/updatecateory", verifyToken, mastercontroller.updatecategory);
route.post("/deletecateory", verifyToken, mastercontroller.deletecategory);

module.exports = route;
