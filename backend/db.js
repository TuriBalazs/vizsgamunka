const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connect = () => {
    mongoose.connect(process.env.MONGO_DB_CONNECT,
        (e) => {
            if (e) {
                console.log(e)
            }
            else {
                console.log("Connected")
            }
        })
}


module.exports = { connect };