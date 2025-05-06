# Combinations Generator API

## Prerequisites

- Node.js (v20 or higher)
- MySQL (v8 or higher)
- yarn

## Setup

1. Clone the repository
2. Install dependencies:
```
yarn install
```

3. Set up the database:
```
CREATE DATABASE IF NOT EXISTS skillex_combinations;

USE skillex_combinations;

-- items
CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- responses
CREATE TABLE IF NOT EXISTS responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- combinations
CREATE TABLE IF NOT EXISTS combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    response_id INT NOT NULL,
    combination JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (response_id) REFERENCES responses(id)
);

-- indexes
CREATE INDEX idx_items_name ON items(name);
CREATE INDEX idx_combinations_response_id ON combinations(response_id); 
 ```

4. For start project
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
  "id": "_id",
  "combination": [
    ["A1", "B1"],
    ["A1", "B2"],
    ["A1", "C1"],
    ["B1", "C1"],
    ["B2", "C1"]
  ]
}
```

## Error Handling

The API includes proper error handling for:
- Invalid input validation
- Transaction failures

## Postman Collection
```
skillex.postman_collection.json
```