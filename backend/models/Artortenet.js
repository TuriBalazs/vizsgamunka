const mongoose=require('mongoose');

const artortenetSchema=new mongoose.Schema({
    kezdetiDatum:{
        type:Date,
        default:Date()
    },
    vegDatum:{
        type:Date
    },
    ar:{
        type:Number,
        require:[true]
    },
    trkId:{
        type:mongoose.Types.ObjectId,
        ref:'Termekek'
    }

});

module.exports=mongoose.model('Artortenet',artortenetSchema);