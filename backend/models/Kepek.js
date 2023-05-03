const mongoose=require('mongoose');

const kepekSchema=new mongoose.Schema({
    eredeti:{
        type:String,
        minLength:5,
        unique: false
    },
    belyeg:{
        type:String,
        minLength:5,
        unique: false
    },
    trkId:{
        type:mongoose.Types.ObjectId,
        ref:'Termekek'
    }

});

module.exports=mongoose.model('Kepek',kepekSchema);