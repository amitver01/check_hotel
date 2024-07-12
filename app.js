const express = require("express");
const app=express();
const db=require("./db")



const bodyParser = require('body-parser');
const personRoutes = require("./routes/personRoutes")
const menuItemRoutes = require("./routes/menuItemsRoutes");
app.use(bodyParser.json());

app.get("/" , (req , res)=>{
    res.send("HAR HAR MAHADEV");
})

app.use("/person" , personRoutes);
app.use("/menu" , menuItemRoutes);


app.listen(3000 , ()=>{
    console.log("listening at 3000")
});