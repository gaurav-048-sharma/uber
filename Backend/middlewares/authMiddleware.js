const userModel = require("../models/user.model.js");
const captainModel = require("../models/captainModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistTokenModel.js");


module.exports.authUser = async(req, res, next) => {
    // const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    // if (!token) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    // try {
        
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     const user = await userModel.findById(decoded._id)
    //     // if (!user) {
    //     //     return res.status(404).json({ message: "User not found" });
    //     // }
    //     req.user = user;
    //     return next();
    // }catch(err) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    try {
        const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not provided" });
        }

        const isBlacklisted = await BlacklistToken.findOne({token:token});
        if (isBlacklisted) {
            return res.status(401).json({ message: "unauthorized" });
        }
        if (!process.env.JWT_SECRET) {
            console.warn("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user; // Attach user to the request object
        return next();
    } catch (err) {
        console.error("Authentication error:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}

module.exports.authCaptain= async (req, res, next) => {
    try {
    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not provided" });
        }

        const isBlacklisted = await BlacklistToken.findOne({token:token});
        if (isBlacklisted) {
            return res.status(401).json({ message: "unauthorized" });
        }
        // if (!process.env.JWT_SECRET) {
        //     console.warn("JWT_SECRET is not defined in environment variables.");
        //     return res.status(500).json({ message: "Server configuration error" });
        // }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(404).json({ message: "User not found" });
        }

        req.captain = captain; // Attach user to the request object
        return next();
    } catch (err) {
        console.error("Authentication error:", err.message);
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}