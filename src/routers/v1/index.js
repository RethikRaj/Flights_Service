const express = require('express');
const { PingController } = require('../../controllers');
const airplaneRouter = require('./airplaneRouter');
const cityRouter = require('./cityRouter');
const airportRouter = require('./airportRouter');
const flightRouter = require('./flightRouter');

const router = express.Router();

router.use('/airplanes', airplaneRouter);
router.use('/cities', cityRouter);
router.use('/airports', airportRouter);
router.use('/flights', flightRouter);



router.get('/ping', PingController.ping);

module.exports = router