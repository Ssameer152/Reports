const jwt = require("jsonwebtoken");
const SECRET_KEY = "676667";
const expiresIn = "1h";
const user = require("../model/user.model");
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function validateToken(req, res) {
  const token = req.headers.authorization;
  // console.log(typeof(token));
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) res.status(500).send({ message: "Invalid Token", error: err });
    else {
      console.log(payload);
      // const newToken=createToken(user);
      const newToken = jwt.sign("123", SECRET_KEY);
      console.log("token", newToken);
      res.set("X-token", newToken);
      res.status(200).send({ message: "New token created.." });
    }
  });
}

module.exports = validateToken;
