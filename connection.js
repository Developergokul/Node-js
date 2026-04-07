const { default: mongoose } = require('mongoose');

async function connectionMongoDb(url){
    //connection
    mongoose.connect(url);
}

module.exports = {
    connectionMongoDb,
}
