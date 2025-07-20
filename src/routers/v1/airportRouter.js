const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airplanes/..

// POST : /api/v1/airplanes/
router.post('/', AirportMiddlewares.validateCreateRequest ,AirportController.createAirport);

// GET : /api/v1/airplanes/
router.get('/',AirportController.getAllAirports);

// GET : /api/v1/airplanes/:id
router.get('/:id', AirportController.getAirport);

// DELETE : /api/v1/airplanes/:id
router.delete('/:id', AirportController.deleteAirport);

// PATCH : /api/v1/airplanes/:id
router.patch('/:id', AirportMiddlewares.validateUpdateRequest,AirportController.updateAirport);

module.exports = router;