const mongoose=require('mongoose');

const markaSchema=new mongoose.Schema({
    nev:{
        type:String,
        required:[true]
    }

});

module.exports=mongoose.model('Markak',markaSchema);