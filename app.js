const express = require("express");
const app=express();
const db=require("./db")
require('dotenv').config();


const bodyParser = require('body-parser');
const personRoutes = require("./routes/personRoutes")
const menuItemRoutes = require("./routes/menuItemsRoutes");
app.use(bodyParser.json());

app.get("/" , (req , res)=>{
    res.send("HAR HAR MAHADEV");
})

app.use("/person" , personRoutes);
app.use("/menu" , menuItemRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log("listening at 3000")
});