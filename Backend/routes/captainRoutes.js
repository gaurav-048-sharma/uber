const express = require("express");
const router = express.Router();
const {body}  = require("express-validator");
const captainController = require("../controllers/captainController.js");
const authMiddleware = require("../middlewares/authMiddleware.js")

router.post('/register', [
    body('email').isEmail().withMessage("invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must exist"),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage("vehicle color is required"),
    body('vehicle.plate').isLength({min:3}).withMessage("vehicle plate number is required"),
    body('vehicle.capacity').isInt({min:1}).withMessage("vehicle capacity must be a number"),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage("vehicle type is required")
],
captainController.registerCaptain
  );

router.post('/login', [
    body('email').isEmail().withMessage("invalid Email"),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters'),
], 
captainController.loginCaptain
);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;