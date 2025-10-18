const moogose = require("mongoose"); 
const signup=moogose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["farmer","customer","admin"],
        default:"customer"
    }
});
module.exports=moogose.model("User",signup);