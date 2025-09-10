const express = require('express');
const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

/**
 * @swagger
 * /api/v1/flights:
 *   post:
 *     tags:
 *       - Flights
 *     summary: Create a new flight
 *     description: Create a new flight with departure/arrival details, airplane assignment, and pricing.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFlightRequest'
 *     responses:
 *       201:
 *         description: Flight created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Flight'
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', FlightMiddlewares.validateCreateRequest , FlightController.createFlight);

/**
 * @swagger
 * /api/v1/flights:
 *   get:
 *     tags:
 *       - Flights
 *     summary: Search flights
 *     description: Search for flights with multiple filter options including route, price, date, and passenger count.
 *     parameters:
 *       - in: query
 *         name: trips
 *         schema:
 *           type: string
 *         description: Route in format 'DEPARTURE-ARRIVAL' (e.g., BLR-DEL)
 *         example: BLR-DEL
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         description: Price range in format 'MIN-MAX' (e.g., 1000-5000)
 *         example: 2000-8000
 *       - in: query
 *         name: travellers
 *         schema:
 *           type: integer
 *         description: Minimum number of available seats required
 *         example: 2
 *       - in: query
 *         name: tripDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Departure date in YYYY-MM-DD format
 *         example: 2025-01-15
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort criteria in format 'field_direction' (e.g., price_ASC,departureTime_DESC)
 *         example: price_ASC,departureTime_ASC
 *     responses:
 *       200:
 *         description: Flights retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/FlightWithDetails'
 *             examples:
 *               successful_search:
 *                 summary: Successful Flight Search
 *                 value:
 *                   success: true
 *                   message: "Flights retrieved successfully"
 *                   data:
 *                     - id: 1
 *                       flightNumber: "AI-101"
 *                       departureAirportCode: "BLR"
 *                       arrivalAirportCode: "DEL"
 *                       departureTime: "2025-01-15T09:30:00.000Z"
 *                       arrivalTime: "2025-01-15T12:00:00.000Z"
 *                       price: 5500
 *                       remainingSeats: 150
 *                       airplaneDetails:
 *                         modelName: "Boeing 737-800"
 *                         capacity: 189
 *                       departureAirport:
 *                         name: "Kempegowda International Airport"
 *                         code: "BLR"
 *                         cityDetails:
 *                           name: "Bangalore"
 *                       arrivalAirport:
 *                         name: "Indira Gandhi International Airport"
 *                         code: "DEL"
 *                         cityDetails:
 *                           name: "New Delhi"
 *                   error: {}
 *       400:
 *         description: Bad request - invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/',FlightController.getAllFlights);

/**
 * @swagger
 * /api/v1/flights/{id}:
 *   get:
 *     tags:
 *       - Flights
 *     summary: Get flight by ID
 *     description: Retrieve detailed information about a specific flight by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Flight ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Flight retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Flight'
 *       404:
 *         description: Flight not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Flight not found"
 *               data: {}
 *               error:
 *                 explanation: ["The flight you requested is not present"]
 *                 statusCode: 404
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', FlightController.getFlight);

/**
 * @swagger
 * /api/v1/flights/{id}/seats:
 *   patch:
 *     tags:
 *       - Flights
 *     summary: Update flight seat availability
 *     description: Update the number of available seats for a flight. Used for booking/cancellation operations. Uses row-level locking to prevent race conditions.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Flight ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSeatsRequest'
 *     responses:
 *       200:
 *         description: Seats updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Flight'
 *             example:
 *               success: true
 *               message: "Seats updated successfully"
 *               data:
 *                 id: 1
 *                 flightNumber: "AI-101"
 *                 remainingSeats: 148
 *               error: {}
 *       400:
 *         description: Bad request - validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Flight not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id/seats', FlightMiddlewares.validateUpdateRequest, FlightController.updateSeats);

module.exports = router;
