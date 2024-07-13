const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type : Number,
        required : true
    },
    work: {
        type : String,
        enum :['chef' , 'waiter' , 'manager'],
        requird: true
    },
    mobile:{
        type: String,
        required:true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    salary:{
        type:Number,
        required:true
    },
    userName :{
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save' , async function(next){
    const person = this;
    if(!person.isModified('password'))return next();
    try{
            //salt generated using built in function
            const salt = await bcrypt.genSalt(10);
            // hashed password is generated using salt
            const hashedPasswaord =await bcrypt.hash(person.password , salt);
            person.password = hashedPasswaord;
        next();
    }catch(err){

    }
    
})

const Person = mongoose.model('Person ', personSchema);
module.exports = Person;