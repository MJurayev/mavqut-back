let  mongoose = require("./../config/db")
let jwt = require("jsonwebtoken")

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
    start_at_namaz: { type: Number, required: true }, // yoshi
    start_at_fasting: { type: Number, required: true }, // ro'za yoshi
    // automatic
    initial_total_namaz: { type: Number },
    initial_total_fasting: { type: Number },
    initial_bomdod: { type: Number },
    initial_peshin: { type: Number },
    initial_asr: { type: Number },
    initial_shom: { type: Number },
    initial_xufton: { type: Number },
    initial_vitr: { type: Number },
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
    let secondaryUser = { total_namaz: 0, total_fasting: 0,bomdod: 0,peshin: 0,asr: 0,shom: 0,xufton: 0,vitr: 0, initial_namaz: 0, initial_fasting: 0 }
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
    secondaryUser.initial_total_namaz = secondaryUser.total_namaz
    secondaryUser.initial_total_fasting = secondaryUser.total_fasting
    secondaryUser.initial_bomdod = secondaryUser.bomdod
    secondaryUser.initial_peshin = secondaryUser.peshin
    secondaryUser.initial_asr = secondaryUser.asr
    secondaryUser.initial_shom = secondaryUser.shom
    secondaryUser.initial_xufton = secondaryUser.xufton
    secondaryUser.initial_vitr = secondaryUser.vitr

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

UserSchema.statics.generateToken = function(user) {
    let gUser = { phone: user.phone, password: user.password }

    return jwt.sign(gUser, process.env.JWT_KEY)
}

UserSchema.statics.decodeToken = function (token) {
    try {
        return jwt.verify(token, process.env.JWT_KEY)
    } catch (error) {
        return undefined;
    }
}
 
module.exports = mongoose.model('users', UserSchema )
