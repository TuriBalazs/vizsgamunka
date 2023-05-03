const mongoose=require('mongoose');

const tipusSchema=new mongoose.Schema({
    nev:{
        type:String,
        minLength:3,
        required:[true]
    }

});

module.exports=mongoose.model('Tipusok',tipusSchema);