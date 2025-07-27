const express = require('express');
const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/flights/..

// POST : /api/v1/flights/
router.post('/', FlightMiddlewares.validateCreateRequest , FlightController.createFlight);

// GET : /api/v1/flights/?trips=BLR-MAA
router.get('/',FlightController.getAllFlights);

// GET : /api/v1/flights/:id
router.get('/:id', FlightController.getFlight);

// PATCH : /api/v1/flights/:id
router.patch('/:id', FlightMiddlewares.validateUpdateRequest, FlightController.updateSeats);

module.exports = router;