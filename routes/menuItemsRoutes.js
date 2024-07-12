const express = require("express");
const router = express.Router();
const Menu= require("../models/menuItem");


router.post("/" , async(req , res)=>{
    try{
        const data = req.body;
        const  menu  = new  Menu(data);
        const response = await menu.save();
        console.log("data saved");
        res.status(200).json(response);
        }catch(err){
            console.log(err);
            res.status(500).json({error : "internal server error"});
        }
    })
router.get("/" , async(req , res)=>{
        try{
            const data=await Menu.find();
            res.status(200).json(data);
        }catch(err){
            console.log(err);
            res.status(500).json({error : "internal server error"});
        }
    })
router.get("/delete" , async(req , res)=>{
        try{
            const data=await Menu.deleteOne({name : "Ras-Malai"});
            console.log("delete");
            res.status(200).json(data);
        }catch(err){
            console.log(err);
            res.status(500).json({error : "internal server error"});
        }
    })

router.get("/:taste" , async(req , res)=>{
        try{
            const taste=req.params.taste;
            if(taste == "sour" || taste =="sweet" || taste == "spicy"){
                const data=await Menu.find({taste : taste});
                res.status(200).json(data);
            }else{
                res.status(404).json({error : "internal server error"});
            }
        }catch(err){
            console.log(err);
            res.status(500).json({error : "internal server error"});
        }
    })

module.exports = router;