const mongoose = require("mongoose");
require("dotenv").config();

//const URL="mongodb://localhost:27017/check";
const URL=process.env.DB_URL;
mongoose.connect(URL);

const db=mongoose.connection;

db.on("connected" , ()=>{
    console.log("connected to MONGODB server");
});

db.on("error", (err) => {
    console.log("error occurred:", err);
});


db.on("disconnected" , ()=>{
    console.log("disconnected to MONGODB server");
});

module.exports = db;