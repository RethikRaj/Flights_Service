const express = require('express');
const { PingController } = require('../../controllers');
const airplaneRouter = require('./airplaneRouter');
const cityRouter = require('./cityRouter');
const airportRouter = require('./airportRouter');

const router = express.Router();

router.use('/airplanes', airplaneRouter);
router.use('/cities', cityRouter);
router.use('/airports', airportRouter);



router.get('/ping', PingController.ping);

module.exports = router