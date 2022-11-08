module.exports = (app) => {
  const users = require("../controller/userController.js");
  const emailList = require("../controller/emailController.js");
  var router = require("express").Router();

  router.get("/", users.findAll);
  router.get("/reports", emailList.findAll);
  router.get("/:id", emailList.getEmailById);
  router.post("/login", users.login);
  router.post("/report", emailList.create);
  router.put("/:id", emailList.update);
  router.delete("/:id", emailList.delete);
  app.use("/", router);
};
