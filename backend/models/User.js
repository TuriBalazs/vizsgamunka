const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    vnev:{
        type:String,
        minLength:3,
        required:[true,"Adjon meg usernevet"]
    },
    knev:{
        type:String,
        minLength:3,
        required:[true,"Adjon meg usernevet"]
    },
    email:{
        type:String,
        minLength:6,
        required:[true,"Adjon meg email címet!"],
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        minLength:8,
        required:[true,"Adjon meg egy jelszót!"]
    },
    phone:{
        type:String,
        minLength:10,
        default:null
    },
    admin:{
        type:String,
        default:null
    }

});

module.exports=mongoose.model('User',userSchema);