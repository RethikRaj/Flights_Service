# Flights Service

This microservice handles all flight-related operations in our airline management system. It manages flight schedules, airplane data, airport information, and real-time seat availability.

## What does this service do?

The Flights Service is the core of our flight management system. It handles everything related to flights:

- **Flight Management**: Create, read, and manage flight schedules with detailed route information
- **Advanced Search**: Multi-parameter flight search with filtering by route, price, date, and passenger requirements
- **Inventory Management**: Real-time seat availability tracking with atomic updates
- **Master Data**: Manages airplanes, airports, cities, and seat configurations

## Key Features

### Smart Flight Search
Built a flexible search system that supports:
- **Route filtering**: Search by departure-arrival pairs (e.g., BLR-DEL)
- **Price range filtering**: Find flights within budget (e.g., 2000-8000)
- **Date filtering**: Filter by specific travel dates
- **Passenger requirements**: Ensure sufficient available seats
- **Dynamic sorting**: Sort by price, departure time, or other criteria

### Seat Management with Concurrency Control
Implemented robust seat management to handle high-traffic scenarios:
- Database transactions with row-level locking
- Atomic seat increment/decrement operations
- Prevention of race conditions during booking rushes
- Integration with booking service for seat reservations

### Complex Data Relationships
Designed a normalized database structure:
- **Cities** contain multiple **Airports**
- **Airports** serve as departure/arrival points for **Flights**
- **Airplanes** are assigned to **Flights** with capacity constraints

## Technical Implementation

### Database Design
Using MySQL with Sequelize ORM for:
- Complex JOIN operations for flight search with airport/city details
- Foreign key constraints ensuring data integrity
- Proper indexing for search performance
- Migration-based schema management

### Search Algorithm
Built a custom query builder that:
1. Parses multiple query parameters (trips, price, date, travelers)
2. Constructs dynamic WHERE clauses using Sequelize operators
3. Handles price ranges, date ranges, and availability checks
4. Returns enriched results with airplane and airport details

### Performance Optimizations
- Efficient query construction with proper JOINs
- Row-level locking for seat updates
- Transactional operations for data consistency
- Optimized database indices for search queries

## Project Structure

```
src/
├── config/          # Database and server configuration
├── controllers/     # Flight, airplane, airport, city controllers
├── middlewares/     # Request validation and error handling
├── models/         # Sequelize models with associations
├── repositories/   # Database queries and complex operations
├── routers/        # RESTful API route definitions
├── services/       # Business logic and data processing
└── migrations/     # Database schema migrations
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
PORT=your_port
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=flights_db
```

3. Run database migrations:
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

4. Start the service:
```bash
npm run dev
```

## API Documentation

Interactive API documentation is available at:
http://localhost:your_port/api-docs

## Main Endpoints

- `GET /api/v1/flights` - Search flights with advanced filters
- `POST /api/v1/flights` - Create new flight
- `GET /api/v1/flights/:id` - Get specific flight details
- `PATCH /api/v1/flights/:id/seats` - Update seat availability
- `GET /api/v1/airports` - List airports
- `GET /api/v1/cities` - List cities
- `GET /api/v1/airplanes` - List airplanes

## Example Search Query

```
GET /api/v1/flights?trips=BLR-DEL&price=2000-8000&tripDate=2025-01-15&travellers=2&sort=price_ASC
```

This finds all flights from Bangalore to Delhi, priced between 2000-8000, on January 15th, 2025, with at least 2 available seats, sorted by price.
