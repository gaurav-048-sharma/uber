const express = require("express");
const router = express.Router();
const {body}  = require("express-validator");
const userController = require("../controllers/user.controllers.js");
const authMiddleware = require("../middlewares/authMiddleware.js")

router.post("/register", [
    body('email').isEmail().withMessage("invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("firstname must exist"),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters')
],
userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage("invalid Email"),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters')
],userController.loginUser )

router.get('/profile',authMiddleware.authUser, userController.getUserProfile)
router.get('/logout', authMiddleware.authUser, userController.logoutUser)
module.exports = router;