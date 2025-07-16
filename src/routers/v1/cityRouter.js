const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

// POST : /api/v1/cities
router.post('/', CityMiddlewares.validateCreateRequest,CityController.createCity);

// DELTE : /api/v1/cities/:id
router.delete('/:id', CityController.deleteCity);

module.exports = router;