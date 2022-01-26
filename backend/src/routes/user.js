const router = require("express").Router()
const userController = require("../controllers/userController")

router.get("/:id",userController.checkUser)
router.post("/create-user", userController.createUser)
router.get("/", userController.getUsers)
router.put("/update/:username", userController.updateUser)

module.exports = router