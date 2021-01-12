let  mongoose = require("./../config/db")

// Qoldiq lar jadvali
let RemnantSchema = mongoose.Schema({
    user_id: { type: String },
    total_namaz: { type: Number }, // rakatlar soni,
    total_fasting: { type: Number }, // ro'za kunlari soni
    bomdod: { type: Number }, 
    peshin: { type: Number }, 
    asr: { type: Number }, 
    shom: { type: Number }, 
    xufton: { type: Number },   
    vitr: { type: Number },
    created_at: { type: Date, default: new Date() } 
})

let Remnant = mongoose.model('remnants', RemnantSchema )

module.exports = Remnant