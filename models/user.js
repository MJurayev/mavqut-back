let  mongoose = require("./../config/db")

let mainAge = process.env.MAIN_AGE || 14;

let UserSchema = mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    age: { type: Number },
    gender: { type: String },
    email: { type: String },
    phone: { type: String, required: true , unique: true },
    password: { type: String, required: true  },
    avatar: { type: String },
    start_at_namaz: { type: Date, required: true }, // yoshi
    start_at_fasting: { type: Date, required: true }, // ro'za yoshi
    // automatic
    total_namaz: { type: Number }, // rakatlar soni,
    total_fasting: { type: Number }, // ro'za kunlari soni
    bomdod: { type: Number }, 
    peshin: { type: Number }, 
    asr: { type: Number }, 
    shom: { type: Number }, 
    xufton: { type: Number },   
    vitr: { type: Number },
    created_at: { type: Date, default: new Date()  }
})
  
UserSchema.statics.generateAutomaticAttributes = function(user) {
    let secondaryUser = { total_namaz: 0, total_fasting: 0,bomdod: 0,peshin: 0,asr: 0,shom: 0,xufton: 0,vitr: 0 }
    if( user.start_at_namaz > mainAge ){
        let totalYear = user.start_at_namaz - mainAge; 

        secondaryUser.total_namaz = totalYear * 365 * 20;
        secondaryUser.bomdod = totalYear * 365 * 2;
        secondaryUser.peshin = totalYear * 365 * 4;
        secondaryUser.asr = totalYear * 365 * 4;
        secondaryUser.shom = totalYear * 365 * 3;
        secondaryUser.xufton = totalYear * 365 * 4;
        secondaryUser.vitr = totalYear * 365 * 3;
        
    }
    if( user.start_at_fasting > mainAge ){

        let totalYear = user.start_at_fasting - mainAge; 

        secondaryUser.total_fasting = totalYear * 30;
    }

    return {readyUser: {...user,...secondaryUser}, secondaryUser}

}


UserSchema.statics.getUserInfo = function(a) {
    let b = Object.assign({},a)
    let newUser = b._doc;
    delete newUser.password
    delete newUser.start_at_namaz
    delete newUser.start_at_fasting
    delete newUser.total_namaz
    delete newUser.total_fasting
    delete newUser.bomdod
    delete newUser.peshin
    delete newUser.asr
    delete newUser.shom
    delete newUser.xufton
    delete newUser.vitr
    return newUser
}
 
module.exports = mongoose.model('users', UserSchema )
