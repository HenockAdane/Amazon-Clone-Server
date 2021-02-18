const express = require('express');
const controller = require("../controllers/AuthController")

const router = express.Router();

router.post('/signin', controller.signIn)
router.post("/signup", controller.signUp)
router.post("/confirm", controller.confirmAccount)
router.post("/resend-confirmation-code", controller.resendConfirmationCode)
router.put('/edit/name', controller.updateName)
router.put('/edit/email', controller.updateEmail)
router.put('/edit/password', controller.updatePassword)

module.exports = router;

// app.post("/api/auth/signIn")