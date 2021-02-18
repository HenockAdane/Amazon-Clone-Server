const express = require("express")
const controller = require("../controllers/ProductController")

const router = express.Router()

router.get("/category/:category", controller.getProductsByCategory)
router.get("/product/:productID", controller.getProductByID)
router.get("/product/search/:value", controller.getProductBySearch)
router.post("/product/reviews/post", controller.postReview)


module.exports = router