const router = require("express").Router()
const sectorController = require("../controllers/sectorController")
const check = require("express-validator")

router.post("/create-sector", sectorController.createSector)
router.get("/", sectorController.getAllData)
router.post("/append-subsectors/:id", sectorController.appendSectorData)
router.get("/:id", sectorController.getSectorsData)
router.put("/delete-sector/:id", sectorController.deleteAllDataFromSector)

module.exports = router