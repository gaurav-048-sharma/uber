const userModel = require("../models/user.model.js");

module.exports.creatUser = async({
    firstname, lastname,email,password
}) => {
    if(!firstname ||!email ||! password ) {
        throw new Error("all fields are required");
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}