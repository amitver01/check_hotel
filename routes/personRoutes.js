const express = require("express");
const router = express.Router();
const Person = require("../models/person"); 

router.post("/" , async(req , res)=>{
    try{
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal server error"});
    }
})
router.get("/" , async(req , res)=>{
    try{
        const data=await Person.find()
        console.log("data saved");
    res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal server error"});
    }
})

router.get("/:workType" , async(req , res)=>{
    try{
        const workType=req.params.workType;
        if(workType == "waiter" || workType == "chef" || workType == "manager"){
        const response = await Person.find({work : workType});
        res.status(200).json(response);
        }else{
            res.status(404).json({error : "mismatch"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal server error"});
    }
})

router.put("/update/:id" , async(req , res)=>{
    try{
        const personId = req.params.id;
        const dataToUpdate=req.body;

        const response = await Person.findByIdAndUpdate(personId , dataToUpdate , {
            new:true,
            runValidators: true
        })
        res.status(200).json(response);
        if(!response){
            return res.status(404).json({error : "Person not found"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : "INTERNAL SERVER ERROR"})
    }
})
module.exports = router;