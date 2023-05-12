const mongoose=require('mongoose');

const rendelesSchema=new mongoose.Schema({
    rendelesDatum:{
        type:Date,
        default:Date()
    },
    vnev:{
        type:String,
        minLength:3,
        default:null
    },
    knev:{
        type:String,
        minLength:3,
        default:null
    },
    phone:{
        type:String,
        minLength:10,
        default:null
    },
    fizetesi_mod:{
        type:String,
        required:[true]
    },
    szallitasi_cim:{
        type:String,
        default:null
    },
    szamlazasi_cim:{
        type:String,
        default:null
    },
    kedvezmeny:{
        type:Number,
        default:null
    },
    vegosszeg:{
        type:Number,
        required:[true]
    },
    tetelek:{
        type:String,
        required:[true]
    },
    szcmId:{
        type:mongoose.Types.ObjectId,
        ref:'SzalCim',
        default:null
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        default:null
    }

});

module.exports=mongoose.model('Rendeles',rendelesSchema);