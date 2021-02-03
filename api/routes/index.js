const express = require('express');
const authRoutes = require('./AuthRoutes');
// const productRoutes = require('./ProductRoutes')

const router = express.Router();

router.use('/auth', authRoutes);
// router.use('/product', productRoutes)

module.exports = router;