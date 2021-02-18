const express = require('express');
const controller = require("../controllers/ListController")

const router = express.Router();

router.get('/getAllListNames/:userID', controller.getAllListNames)
router.get("/getListByName/:userID/:listName", controller.getListByName)
router.post("/create", controller.createList)
router.post("/add", controller.addToList)


module.exports = router;

// app.post("/api/auth/signIn")