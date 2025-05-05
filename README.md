# Combinations Generator API

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   yarn install
   ```

3. Set up the database:
   - Create a MySQL database named `combinations_db`
   - Update the database configuration in `src/config/database.ts` if needed
   - Run the schema.sql file:
     ```
     mysql -u root -p < src/database/schema.sql
     ```

4. For development, you can use:
```
yarn dev
```

## API Usage

### Generate Combinations

**Endpoint:** `POST /generate`

**Request Body:**
```json
{
  "items": [1, 2, 1],
  "length": 2
}
```

**Response:**
```json
{
  "id": 1,
  "combination": [
    ["A1", "B1"],
    ["A1", "B2"],
    ["A1", "C1"],
    ["B1", "C1"],
    ["B2", "C1"]
  ]
}
```

### Rules
- Items with the same starting letter (e.g., A1 and A2) cannot be combined together
- The API uses MySQL transactions to ensure data consistency
- Each combination is stored with a unique ID

## Error Handling

The API includes proper error handling for:
- Invalid input validation
- Transaction failures

## Database Schema

The database consists of three tables:
- `items`: Stores the items (e.g., A1, B1, etc.)
- `combinations`: Stores the generated combinations with their unique IDs
- `responses`: Stores the responses sent to the client

## Implementation Details
- Uses raw SQL queries
- Implements MySQL transactions for data consistency
- Efficient combination generation algorithm
- Input validation and error handling
- TypeScript
