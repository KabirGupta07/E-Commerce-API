const express = require("express")
const router = express.Router()

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController()

//REGISTER
router.post("/register", authController.register);
//LOGIN
router.post("/login", authController.register)

module.exports = router