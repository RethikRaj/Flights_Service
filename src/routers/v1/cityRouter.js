const express = require('express');

const { CityController } = require('../../controllers');
const { CityMiddlewares } = require('../../middlewares');

const router = express.Router();

// POST : /api/v1/cities
router.post('/', CityMiddlewares.validateCreateOrUpdateRequest,CityController.createCity);

// DELTE : /api/v1/cities/:id
router.delete('/:id', CityController.deleteCity);

// UPDATE : /api/v1/cities/:id
router.patch('/:id', CityMiddlewares.validateCreateOrUpdateRequest,CityController.updateCity);

module.exports = router;