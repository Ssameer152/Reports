const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const PORT = 7000;
const connection = require("./db/connection");

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "676667";
const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to express app" });
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const routes = require("./routes/routes");
app.use("/api", require("./routes/auth"));
app.use(express.static("public"));

app.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.passwd, salt);
    console.log(salt);
    console.log(hashPassword);
    const name = req.body.user_name;
    const email = req.body.user_email;
    const passwd = hashPassword;
    const check = "SELECT count(*) as cnt from users where user_email=?";
    connection.query(check, email, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        if (data[0].cnt > 0) {
          res.send("email already exists");
        } else {
          const insert =
            "INSERT into users(user_name,user_email,passwd) VALUES(?,?,?)";
          connection.query(
            insert,
            [name, email, passwd],
            function (error, result) {
              if (error) throw error;
              res.send("user registered successfully");
            }
          );
        }
      }
    });
  } catch {
    res.status(500).send();
  }
});
routes(app);

app.listen(PORT, () => {
  console.log("Application running on Port " + PORT);
});
