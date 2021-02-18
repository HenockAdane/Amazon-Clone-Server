const express = require("express")
const controller = require("../controllers/StripeController")

const router = express.Router()


router.post('/charge', controller.processPayment)
router.post('/refundAll', controller.refundAll)


module.exports = router