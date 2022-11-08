let userSchema = require("../model/user.model");
exports.login = (req, res) => {
  console.log("in login controller ,", req.body);
  userSchema.login(req.body.data, (error, result) => {
    if (error) {
      res.status(404).send({
        message:
          error.message ||
          "Unauthorized User, Login with valid user credentials",
      });
    }
    if (result != null) {
      res.status(200).send(result);
    } else {
      res.status(401).send({
        msg: "Email or password is incorrect!",
      });
    }
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  userSchema.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retreiving the User.",
      });
    else {
      res.send(data);
    }
  });
};
