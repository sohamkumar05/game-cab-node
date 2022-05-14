const express = require('express');
const router = express.Router();

const vehiclesController = require("../controllers/vehicles");

/* GET vehicles listing. */
router.get('/', vehiclesController.getAllVehicles);
router.get('/:vehicle_type', vehiclesController.getVehicles);
router.put('/:vehicle_type', vehiclesController.unlockVehicle);

module.exports = router;
