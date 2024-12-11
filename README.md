# Documentation for `/users/register` Endpoint

## **Endpoint Description**
The `/users/register` endpoint is used to register a new user in the system. It accepts user data, validates it, and stores it in the database if all conditions are met.

---

## **HTTP Request**
- **Method:** POST
- **URL:** `/users/register`

---

## **Request Body**
The following fields are required in the request body:

| Field                 | Type     | Description                                  | Required |
|-----------------------|----------|----------------------------------------------|----------|
| `fullname.firstname`  | `string` | The first name of the user (min length: 3)  | Yes      |
| `fullname.lastname`   | `string` | The last name of the user (min length: 3)   | No       |
| `email`               | `string` | A valid email address                       | Yes      |
| `password`            | `string` | A strong password (min length: 6)           | Yes      |

---

## **Response**
| Status Code | Description                          |
|-------------|--------------------------------------|
| 201         | User successfully registered         |
| 400         | Bad request (validation failed)      |
| 409         | Conflict (email already exists)      |
| 500         | Internal server error                |

### **Example Response**
#### **Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "id": "1234567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### **Error Response (400):**
```json
{
  "errors": [
    { "msg": "firstname must exist", "param": "fullname.firstname" },
    { "msg": "invalid Email", "param": "email" }
  ]
}
```

---

## **File Structure and Explanation**

### **1. `user.controller.js`**
The controller handles the logic for the `/register` endpoint. It:
- Validates the incoming request data using `express-validator`.
- Hashes the password for security.
- Creates a new user and saves it to the database.

#### **Implementation:**
```javascript
const userModel = require("../models/user.model.js");
const userService = require("../services/user.services.js");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashPassword = await userModel.hashpassword(password);

    const user = await userService.creatUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
};
```

---

### **2. `user.model.js`**
The model defines the structure of the user data in the database.

#### **Implementation:**
```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "first name must be a least 3 characters"]
        },
        lastname: {
            type: String,
            minlength: [3, "last name must be a least 3 characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "email must be a least 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashpassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
```

---

### **3. `userroutes.js`**
The routes file maps the endpoint to the controller function and includes validation middleware.

#### **Implementation:**
```javascript
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controllers.js");

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("invalid Email"),
        body("fullname.firstname").isLength({ min: 3 }).withMessage("firstname must exist"),
        body("password").isLength({ min: 6 }).withMessage("password must be at least 6 characters")
    ],
    userController.registerUser
);

module.exports = router;
```
