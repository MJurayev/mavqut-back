let mongoose = require("mongoose")
let ErrorHandler = require("./../utils/errorHandler")

let mongourl = process.env.MONGO_URL;

mongoose.connect( mongourl , { useNewUrlParser: true, useUnifiedTopology: true },  ).then((result) => {
    console.log("Db connected !");
}).catch(e => new ErrorHandler("__Error: "+e) )

mongoose.Promise = global.Promise

module.exports = mongoose
