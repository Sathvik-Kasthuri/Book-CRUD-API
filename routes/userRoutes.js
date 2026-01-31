const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");

//post register user

router.post("/register", registerUser);

//post login user

router.post("/login", loginUser);

module.exports = router;
