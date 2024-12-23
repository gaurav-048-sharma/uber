const captainModel = require("../models/captainModel.js");
const captainService = require("../services/captain.service.js")
const {validationResult} = require("express-validator");
const BlacklistToken = require("../models/blacklistTokenModel.js")




module.exports.registerCaptain = async(req, res, next)=> {

    
        try {
            const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
           }
            const {fullname, email, password, vehicle} = req.body;
           
           const isCaptainExist = await captainModel.findOne({email});
           if(isCaptainExist) {
               return res.status(400).json({message: "Captain already exists with this email"});
           }
            const hashedPassword = await captainModel.hashpassword(password);
           const captain = await captainService.createCaptain({  // Fixed typo in service name
               firstname: fullname.firstname,
               lastname: fullname.lastname, 
               email,
               password: hashedPassword,
               color: vehicle.color,
               plate: vehicle.plate,
               capacity: vehicle.capacity,
               vehicleType: vehicle.vehicleType
           });
            const token = captain.generateAuthToken();
           
           return res.status(201).json({
               message: "Captain registered successfully",
               captain,
               token
           });
       } catch (error) {
           console.error('Captain registration error:', error);
           return res.status(500).json({ message: "Internal server error", error: error.message });
       }
    
    
};


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email }).select('+password');
        
        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await captain.comparePassword(password);
        
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();

        return res.status(200).json({
            message: "Login successful",
            captain,
            token
        });

    } catch (error) {
        console.error('Captain login error:', error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports.getCaptainProfile= async(req, res, next)=> {
    res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
   const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
   await BlacklistToken.create({token})
   res.clearCookie('token');
   res.status(200).json({message: "Logged out successfully"});
}