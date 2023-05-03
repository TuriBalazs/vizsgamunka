const mongoose=require('mongoose');

const szalcimSchema=new mongoose.Schema({
    iranyitoszam:{
        type:Number,
        required:[true]
    },
    varosnev:{
        type:String,
        required:[true]
    },
    cim:{
        type:String,
        required:[true]
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        default:null
    }

});

module.exports=mongoose.model('SzalCim',szalcimSchema);