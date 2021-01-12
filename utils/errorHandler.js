module.exports = class ErrorHandler {
    constructor(msg,res){
        if( !res ){
            console.log(msg);
        }else {
            res.status(401).json( {msg} )
        }
        
    }
}