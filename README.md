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

| Field         | Type     | Description                          | Required |
|---------------|----------|--------------------------------------|----------|
| `name`        | `string` | The full name of the user            | Yes      |
| `email`       | `string` | A valid email address                | Yes      |
| `password`    | `string` | A strong password for the user       | Yes      |
| `age`         | `number` | The age of the user (optional field) | No       |

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
  "message": "User registered successfully",
  "data": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 25
  }
}
```

#### **Error Response (400):**
```json
{
  "error": "Validation error: Password must be at least 8 characters"
}
```

---

## **File Structure and Explanation**

### **1. `user.controller.js`**
The controller handles the logic for the `/register` endpoint. It:
- Validates the incoming request data.
- Checks if the email already exists in the database.
- Hashes the password for security.
- Creates a new user and saves it to the database.

#### **Implementation:**
```javascript
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { name, email, password, age } = req.body;

    try {
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already in use." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age || null
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
```

---

### **2. `user.model.js`**
The model defines the structure of the user data in the database.

#### **Implementation:**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
```

---

### **3. `userroutes.js`**
The routes file maps the endpoint to the controller function.

#### **Implementation:**
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// POST /users/register
router.post('/register', userController.registerUser);

module.exports = router;
