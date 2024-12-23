const mongoose = require("mongoose");

function connectMongoDB()  {
 
        mongoose.connect("mongodb://127.0.0.1:27017/uberclone")
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => console.error('MongoDB connection error:', err));
   
}

module.exports = connectMongoDB;
