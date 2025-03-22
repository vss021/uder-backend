# User Registration Endpoint Documentation

## Endpoint: `/user/register`

### Description

This endpoint allows new users to register on the platform. It requires specific user details to create a new account.

### Request Body

The request body should be in JSON format and contain the following fields:

```json
{
  "username": "string", // Required: User's username
  "password": "string", // Required: User's password
  "email": "string",    // Required: User's email address
  "firstName": "string", // Required: User's first name
  "lastName": "string"  // Required: User's last name
}
```

### Status Codes

*   `201 Created`: Successfully created a new user account.
*   `400 Bad Request`: The request body is invalid or missing required fields.
*   `409 Conflict`: A user with the provided username or email already exists.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzNjQzZjE2NjQ4NzQzNDY4NzQzMjEiLCJpYXQiOjE2OTExNjE4ODd9.YR1dr4jQi_MDNmhonXw9G5aLW4f_jKxL3V7fGTWjV1k",
  "user": {
    "_id": "64d3643f1664874346874321",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

## Endpoint: `/captains/register`

### Description

This endpoint allows new captains to register on the platform. It requires specific captain details, including vehicle information, to create a new account.

### Request Body

The request body should be in JSON format and contain the following fields:

```json
{
  "fullname": {
    "firstname": "string", // Required: Captain's first name
    "lastname": "string"   // Optional: Captain's last name
  },
  "email": "string",        // Required: Captain's email address
  "password": "string",     // Required: Captain's password
  "vehicle": {
    "color": "string",      // Required: Vehicle color
    "plate": "string",      // Required: Vehicle plate number
    "capacity": "number",   // Required: Vehicle capacity
    "vehicleType": "string" // Required: Vehicle type (e.g., "car", "motorcycle", "auto")
  }
}
```

### Status Codes

*   `201 Created`: Successfully created a new captain account.
*   `400 Bad Request`: The request body is invalid or missing required fields.
*   `409 Conflict`: A captain with the provided email already exists.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (201 Created)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzNjQzZjE2NjQ4NzQzNDY4NzQzMjEiLCJpYXQiOjE2OTExNjE4ODd9.YR1dr4jQi_MDNmhonXw9G5aLW4f_jKxL3V7fGTWjV1k",
  "captain": {
    "_id": "64d3643f1664874346874321",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## Endpoint: `/captains/login`

### Description

This endpoint allows registered captains to log in to the platform. It verifies the captain's credentials and returns an authentication token.

### Request Body

The request body should be in JSON format and contain the following fields:

```json
{
  "email": "string",    // Required: Captain's email address
  "password": "string" // Required: Captain's password
}
```

### Status Codes

*   `200 OK`: Successfully logged in and returned the authentication token.
*   `400 Bad Request`: The request body is invalid or missing required fields.
*   `401 Unauthorized`: Invalid email or password.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzNjQzZjE2NjQ4NzQzNDY4NzQzMjEiLCJpYXQiOjE2OTExNjE4ODd9.YR1dr4jQi_MDNmhonXw9G5aLW4f_jKxL3V7fGTWjV1k",
  "captain": {
    "_id": "64d3643f1664874346874321",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## Endpoint: `/user/login`

### Description

This endpoint allows registered users to log in to the platform. It verifies the user's credentials and returns an authentication token.

### Request Body

The request body should be in JSON format and contain the following fields:

```json
{
  "email": "string",    // Required: User's email address
  "password": "string" // Required: User's password
}
```

### Status Codes

*   `200 OK`: Successfully logged in and returned the authentication token.
*   `400 Bad Request`: The request body is invalid or missing required fields.
*   `401 Unauthorized`: Invalid email or password.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzNjQzZjE2NjQ4NzQzNDY4NzQzMjEiLCJpYXQiOjE2OTExNjE4ODd9.YR1dr4jQi_MDNmhonXw9G5aLW4f_jKxL3V7fGTWjV1k",
  "user": {
    "_id": "64d3643f1664874346874321",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

## Endpoint: `/captains/profile`

### Description

This endpoint allows authenticated captains to retrieve their profile information.

### Headers

The request must include the `Authorization` header with a valid token:

```
Authorization: Bearer <token>
```

### Status Codes

*   `200 OK`: Successfully retrieved the captain's profile.
*   `401 Unauthorized`: The captain is not authenticated.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (200 OK)

```json
{
  "captain": {
    "_id": "64d3643f1664874346874321",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "active",
    "location": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  }
}
```

---

## Endpoint: `/user/profile`

### Description

This endpoint allows authenticated users to retrieve their profile information.

### Headers

The request must include the `Authorization` header with a valid token:

```
Authorization: Bearer <token>
```

### Status Codes

*   `200 OK`: Successfully retrieved the user's profile.
*   `401 Unauthorized`: The user is not authenticated.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (200 OK)

```json
{
  "_id": "64d3643f1664874346874321",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

## Endpoint: `/user/logout`

### Description

This endpoint allows authenticated users to log out by invalidating their token.

### Headers

The request must include the `Authorization` header with a valid token:

```
Authorization: Bearer <token>
```

### Status Codes

*   `200 OK`: Successfully logged out.
*   `401 Unauthorized`: The user is not authenticated.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (200 OK)

```json
{
  "message": "Logout Successfully"
}
```

---

## Endpoint: `/captains/logout`

### Description

This endpoint allows authenticated captains to log out by invalidating their token.

### Headers

The request must include the `Authorization` header with a valid token:

```
Authorization: Bearer <token>
```

### Status Codes

*   `200 OK`: Successfully logged out.
*   `401 Unauthorized`: The captain is not authenticated.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

### Example Response (200 OK)

```json
{
  "message": "Logout Successfully"
}
```
