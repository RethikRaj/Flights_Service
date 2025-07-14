const express = require('express');
const { PingController } = require('../../controllers');
const airplaneRouter = require('./airplaneRouter')

const router = express.Router();

router.use('/airplanes', airplaneRouter);



router.get('/ping', PingController.ping);

module.exports = router