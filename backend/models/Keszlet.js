const mongoose=require('mongoose');

const keszletSchema=new mongoose.Schema({
    sorozatszam:{
        type:String,
        required:[true]
    },
    trkId:{
        type:mongoose.Types.ObjectId,
        ref:'Termekek'
    }

});

module.exports=mongoose.model('Keszlet',keszletSchema);