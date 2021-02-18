const express = require('express');
const authRoutes = require('./AuthRoutes');
const productRoutes = require('./ProductRoutes')
const stripeRoutes = require('./StripeRoutes');
const ListRoutes = require("./ListRoutes")
const router = express.Router();

router.use('/auth/account', authRoutes);
router.use('/shop', productRoutes)
router.use("/payment", stripeRoutes)
router.use("/list", ListRoutes)
// router.use("/account/login-and-security/edit", UserAccountRoutes)

module.exports = router;