const express = require("express");
const validateToken = require("../controller/authController");
const router = express.Router();
router.post("/token", validateToken);
module.exports = router;
