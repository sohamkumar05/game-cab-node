const express = require('express');
const router = express.Router();

const locationsController = require("../controllers/locations");

/* GET vehicles listing. */
router.get('/', locationsController.getAllLocations);
router.get('/:location_id', locationsController.getLocation);
router.put('/unlock', locationsController.unlockLocation);

module.exports = router;