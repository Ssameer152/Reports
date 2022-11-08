const sql = require("../db/connection");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "676667";
const expiresIn = "1h";
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

const userDetail = function (user) {
  this.user_name = user.user_name;
  this.user_email = user.user_email;
  this.passwd = user.passwd;
};

userDetail.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    console.log("New user", newUser);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

userDetail.login = (user, res) => {
  console.log("user model , ====", user);
  let { email, password } = user;
  let q = `SELECT * FROM users WHERE user_email='${email}'`;
  sql.query(q, (err, result) => {
    console.log("Result:", result);
    // user does not exists
    if (err) {
      throw err;
    }

    if (bcrypt.compareSync(password, result[0]["passwd"])) {
      const access_token = createToken({
        email,
        password,
      });
      console.log("access_token", access_token);
      res(null, {
        token: access_token,
        message: "Login Successfully",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "asamy840@gmail.com",
          pass: "gmtljeqpuuhyobnx",
        },
      });

      var mailOptions = {
        from: "asamy840@gmail.com",
        to: email,
        subject: "Sending Email using Node.js",
        text: "Welcome to node js app by sameer",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } else {
      res(null, null);
    }
  });
};

userDetail.getAll = (req, result) => {
  let query = "SELECT * FROM users";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = userDetail;
