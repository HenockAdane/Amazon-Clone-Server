const express = require('express');
const controller = require("../controllers/AuthController")

const router = express.Router();

router.post('/signin', controller.signIn)
router.post("/signup", controller.signUp)
router.post("/confirm/account", controller.confirmAccount)
router.post("/confirm/resendcode", controller.resendConfirmationCode)

module.exports = router;

// app.post("/api/auth/signIn")