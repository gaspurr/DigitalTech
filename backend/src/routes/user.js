const router = require("express").Router()
const userController = require("../controllers/userController")

router.get("/:username",userController.checkUser)
router.post("/create-user", userController.createUser)

module.exports = router