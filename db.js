const mongoose = require("mongoose");


const URL="mongodb://localhost:27017/check";

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