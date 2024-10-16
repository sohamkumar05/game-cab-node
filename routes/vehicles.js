const express = require('express');
const router = express.Router();

const vehiclesController = require("../controllers/vehicles");

/* GET vehicles listing. */
router.get('', vehiclesController.getAllVehicles);
router.get('/:vehicle_type', vehiclesController.getVehicles);
router.put('/unlock', vehiclesController.unlockVehicle);
router.put('/resell', vehiclesController.resellVehicle);
router.get('/resell/:vehicle_type', vehiclesController.getResellValue);

module.exports = router;
