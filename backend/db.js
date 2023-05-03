const mongoose=require('mongoose');
mongoose.set('strictQuery', false);

const connect=()=>{
 mongoose.connect(process.env.MONGO_DB_CONNECT
,()=>{console.log("Connected")}
,(e)=>{console.log(e)});
}

module.exports={connect};