const mongoose=require('mongoose');

const termekSchema=new mongoose.Schema({
    nev:{
        type:String,
        minLength:3,
        required:[true]
    },
    leiras:{
        type:String,
        minLength:10
    },
    specifikaciok:{
        type:String,
        minLength:8
    },
    garancia:{
        type:Number,
        default:1
    },
    ar:{
        type:Number,
        min:100
    },
    akcio:{
        type:String,
        minLength:2,
        default:null
    },
    mraId:{
        type:mongoose.Types.ObjectId,
        ref:'Markak'
    },
    tisId:{
        type:mongoose.Types.ObjectId,
        ref:'Tipusok'
    }
});

module.exports=mongoose.model('Termekek',termekSchema);