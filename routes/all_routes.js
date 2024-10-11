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

//heyplay_class_formate_master
route.post("/insertformat", verifyToken, mastercontroller.insertclassformat);
route.get("/getformat", verifyToken, mastercontroller.getclassformate);
route.post("/updateformat", verifyToken, mastercontroller.updateclassformate);
route.post("/deleteformat", verifyToken, mastercontroller.deleteclassformate);
//heyplay_age_master
route.post("/insertage", verifyToken, mastercontroller.interage);
route.get("/getage", verifyToken, mastercontroller.getage);
route.post("/updateage", verifyToken, mastercontroller.updateage);
route.post("/delete", verifyToken, mastercontroller.deleteage);

//heyplay_class_mode
route.post("/insertclass_mode", verifyToken, mastercontroller.inseryclassmode);
route.get("/getclass_mode", verifyToken, mastercontroller.getclassmode);
route.post("/updateclass_mode", verifyToken, mastercontroller.updateclassmode);
route.delete(
  "/deleteclass_mode",
  verifyToken,
  mastercontroller.deleteclassmode
);

//heyplay_user_master
route.post(
  "/insertuser_master",
  verifyToken,
  mastercontroller.inseryuser_master
);
route.get("/gettuser_master", verifyToken, mastercontroller.getuser_master);

route.post(
  "/updateuser_master",
  verifyToken,
  mastercontroller.updateuser_master
);

route.delete(
  "/deleteuser_master",
  verifyToken,
  mastercontroller.deleteuser_master
);

//heyplay_occurrence
route.post(
  "/insertoccurrences",
  verifyToken,
  mastercontroller.inseryoccurrences
);

route.get("/gettoccurrences", verifyToken, mastercontroller.getoccurrences);

route.post(
  "/updatoccurrences",
  verifyToken,
  mastercontroller.updateoccurrences
);

route.delete(
  "/deleteoccurrences",
  verifyToken,
  mastercontroller.deleteoccurrences
);

//heyplay_add_class
route.post("/addclass", verifyToken, mastercontroller.addclass);
route.get("/getclass", verifyToken, mastercontroller.getclass);

module.exports = route;
