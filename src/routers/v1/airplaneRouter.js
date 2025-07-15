const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airplanes/..

// POST : /api/v1/airplanes/
router.post('/', AirplaneMiddlewares.validateCreateRequest ,AirplaneController.createAirplane);

// GET : /api/v1/airplanes/
router.get('/',AirplaneController.getAllAirplanes);

// GET : /api/v1/airplanes/:id
router.get('/:id', AirplaneController.getAirplane);

// DELETE : /api/v1/airplanes/:id
router.delete('/:id', AirplaneController.deleteAirplane);

module.exports = router;