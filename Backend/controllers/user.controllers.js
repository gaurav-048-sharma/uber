const userModel = require("../models/user.model.js");
const userService = require("../services/user.services.js")
const {validationResult} = require("express-validator");
const BlacklistToken = require("../models/blacklistTokenModel.js")
module.exports.registerUser = async( req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } 

    const {fullname, email, password} = req.body;
    const isUserExist = await userModel.findOne({email});
    if(isUserExist) {
        return res.status(400).json({message: "User already exists with this email"});
    }

    const hashPassword = await userModel.hashpassword(password);
    
    const user = await userService.creatUser({
        firstname: fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({token, user});
    
}

module.exports.loginUser = async (req, res, next)  => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } 

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user) {
        return res.status(401).json({message: "invalid email and password"});
    }
    const isMatch = await user.comparePassword(password)

    if(!isMatch) {
        return res.status(401).json({message: "invalid email and password"});
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({token, user});
};

module.exports.getUserProfile = async(req, res, next) => {
    // const user = await userModel.findById(req.user._id).select('-password');
    res.status(200).json(req.user); 

}

module.exports.logoutUser = async(req, res, next) => {
   const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
   await BlacklistToken.create({token})
   res.clearCookie('token');
   res.status(200).json({message: "Logged out"});
}