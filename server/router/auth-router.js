const express = require("express");
const router = express.Router();
const authcontrollers = require("../controller/auth-controller");
const { signupshema, loginshema } = require("../validator/auth-validator");
const validate = require("../middlewares/validate-middlewares");
router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signupshema), authcontrollers.register);

router.route("/login").post(validate(loginshema), authcontrollers.login);

module.exports = router;
