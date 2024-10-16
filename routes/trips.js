const express = require('express');
const router = express.Router();

const tripsController = require("../controllers/trips");

router.get("", tripsController.getTrip);
router.put("/accept", tripsController.acceptTrip);
router.put("/complete", tripsController.completeTrip);

module.exports = router;