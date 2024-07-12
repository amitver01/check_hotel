const mongoose = new require("mongoose");

const menuItem= new mongoose.Schema({
name :{
    type:String,
    required: true
},
price:{
    type:Number,
    required:true
},
taste:{
    type:String,
    enum : ["sweet" , "sour" , "spicy"],
    required : true
}
})
module.exports = mongoose.model("Menu" , menuItem);