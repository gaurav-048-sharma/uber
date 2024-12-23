const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT||3000;
const connectMongoDB = require('./db/connectMongoDB.js');
const userRoutes = require("./routes/userroutes.js")
const captainRoutes = require("./routes/captainRoutes.js")
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("hey");
})

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

app.listen(port, (req, res) => {
    connectMongoDB();
    console.log(`Server is running on port ${port}`);
})