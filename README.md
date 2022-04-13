# Backend API

This API serves to register and authenticate users to the BTC alerting system.  In addition, it allows users to submit new alerts and list the alerts that a user has created.

# Unauthenticated Endpoints

## /user/signup - POST

Used to create a user account.

### Parameters

| **Name** | **Type** | **Required?** | **Description**                          |
|----------|----------|---------------|------------------------------------------|
| name     | string   | yes           | the name of the user who is registering  |
| email    | string   | yes           | the email of the user who is registering |
| password | string   | yes           | password of the user                     |

### Example Request

```json
{
    "name": "postman",
    "email": "postman@postman.com",
    "password": "password"
}
```

### Example Response

```json
{
    "message": "Successful Login",
    "token": "<token>"
}
```

## /user/login - POST

Used to create authenticate a previously registered user account.

### Parameters

| **Name** | **Type** | **Required?** | **Description**                          |
|----------|----------|---------------|------------------------------------------|
| email    | string   | yes           | the email of the user |
| password | string   | yes           | password of the user                     |

### Example Request

```json
{
    "email": "postman@postman.com",
    "password": "password"
}
```

### Example Response

```json
{
    "message": "Successful Login",
    "token": "<token>"
}
```


# Authenticated Endpoints

All authenticated endpoints require a valid JWT token.  User ID will be determined server-side by the JWT.

## Authentication

For all below requests, include a bearer token recieved during the login or signup process.

## /alerts/add - POST

Used by an authenticated user to add an alert on a BTC price.

### Parameters

| **Name** | **Type**                              | **Required?** | **Description**                                                                              |
|----------|---------------------------------------|---------------|----------------------------------------------------------------------------------------------|
| type     | Allowed Values: one of {"MIN", "MAX"} | yes           | Whether this alert should fire if should fire if the price is OVER the MAX, or UNDER the MIN |
| price    | number                                | yes           | The value that will trigger the alert, subject to the alert type                             |
| name     | string                                | yes           | name of the alert                                                                            |                 |

### Example Request

```json
{
    "type": "MAX",
    "price": 40000,
    "name": "alert"
}
```

### Example Response

```json

{
    "message": "New alert created"
}
```


## /alerts/list - POST

Used by an authenticated user list all of their alerts.

### Parameters

None

### Example Request

```json
{}
```

### Example Response

```json
{
    "count": 2,
    "alerts": [
        {
            "_id": "621f051a583f848815ed356b",
            "userId": "621effcb1d9e346dbda5059d",
            "name": "alert",
            "type": "MAX",
            "price": 40000,
            "status": "FIRED",
            "__v": 0
        },
        {
            "_id": "621f054dad43817c0439676f",
            "userId": "621effcb1d9e346dbda5059d",
            "name": "alert",
            "type": "MAX",
            "price": 40000,
            "status": "FIRED",
            "__v": 0
        }
    ]
}
```