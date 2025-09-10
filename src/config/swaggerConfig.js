const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flights Service API',
      version: '1.0.0',
      description: 'Comprehensive flight management service for airline operations',
      contact: {
        name: 'Rethik',
        email: 'developer@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://flights.flightbooking.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Airplane: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Airplane ID',
              example: 1
            },
            modelName: {
              type: 'string',
              description: 'Aircraft model name',
              example: 'Boeing 737-800'
            },
            capacity: {
              type: 'integer',
              description: 'Total passenger capacity',
              minimum: 0,
              maximum: 2000,
              example: 189
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        City: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              description: 'City name',
              example: 'Bangalore'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Airport: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Airport name',
              example: 'Kempegowda International Airport'
            },
            code: {
              type: 'string',
              description: 'IATA airport code',
              example: 'BLR'
            },
            address: {
              type: 'string',
              description: 'Airport address',
              example: 'Devanahalli, Bangalore'
            },
            cityId: {
              type: 'integer',
              description: 'Associated city ID',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Flight: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            flightNumber: {
              type: 'string',
              description: 'Flight identifier',
              example: 'AI-101'
            },
            departureAirportCode: {
              type: 'string',
              description: 'Departure airport IATA code',
              example: 'BLR'
            },
            arrivalAirportCode: {
              type: 'string',
              description: 'Arrival airport IATA code',
              example: 'DEL'
            },
            departureTime: {
              type: 'string',
              format: 'date-time',
              description: 'Scheduled departure time',
              example: '2025-01-15T09:30:00.000Z'
            },
            arrivalTime: {
              type: 'string',
              format: 'date-time',
              description: 'Scheduled arrival time',
              example: '2025-01-15T12:00:00.000Z'
            },
            airplaneId: {
              type: 'integer',
              description: 'Associated airplane ID',
              example: 1
            },
            price: {
              type: 'integer',
              description: 'Ticket price in currency units',
              example: 5500
            },
            boardingGate: {
              type: 'string',
              description: 'Boarding gate number',
              example: 'A12'
            },
            remainingSeats: {
              type: 'integer',
              description: 'Available seats for booking',
              example: 150
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        FlightWithDetails: {
          allOf: [
            { $ref: '#/components/schemas/Flight' },
            {
              type: 'object',
              properties: {
                airplaneDetails: {
                  $ref: '#/components/schemas/Airplane'
                },
                departureAirport: {
                  allOf: [
                    { $ref: '#/components/schemas/Airport' },
                    {
                      type: 'object',
                      properties: {
                        cityDetails: {
                          $ref: '#/components/schemas/City'
                        }
                      }
                    }
                  ]
                },
                arrivalAirport: {
                  allOf: [
                    { $ref: '#/components/schemas/Airport' },
                    {
                      type: 'object',
                      properties: {
                        cityDetails: {
                          $ref: '#/components/schemas/City'
                        }
                      }
                    }
                  ]
                }
              }
            }
          ]
        },
        CreateFlightRequest: {
          type: 'object',
          required: ['flightNumber', 'departureAirportCode', 'arrivalAirportCode', 'departureTime', 'arrivalTime', 'airplaneId', 'price', 'remainingSeats'],
          properties: {
            flightNumber: {
              type: 'string',
              example: 'AI-101'
            },
            departureAirportCode: {
              type: 'string',
              example: 'BLR'
            },
            arrivalAirportCode: {
              type: 'string',
              example: 'DEL'
            },
            departureTime: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-15T09:30:00.000Z'
            },
            arrivalTime: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-15T12:00:00.000Z'
            },
            airplaneId: {
              type: 'integer',
              example: 1
            },
            price: {
              type: 'integer',
              example: 5500
            },
            boardingGate: {
              type: 'string',
              example: 'A12'
            },
            remainingSeats: {
              type: 'integer',
              example: 150
            }
          }
        },
        UpdateSeatsRequest: {
          type: 'object',
          required: ['numberOfSeats'],
          properties: {
            numberOfSeats: {
              type: 'integer',
              description: 'Number of seats to increase/decrease',
              example: 2
            },
            decrease: {
              type: 'boolean',
              description: 'Whether to decrease seats (true) or increase seats (false)',
              default: true,
              example: true
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            error: {
              type: 'object',
              example: {}
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Operation failed'
            },
            data: {
              type: 'object',
              example: {}
            },
            error: {
              type: 'object',
              properties: {
                explanation: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  example: ['Validation error', 'Resource not found']
                },
                statusCode: {
                  type: 'integer',
                  example: 400
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routers/*.js', './src/controllers/*.js'] // Path to the API files
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
