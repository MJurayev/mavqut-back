let  mongoose = require("./../config/db")

// Qoldiq lar jadvali
let DailySchema = mongoose.Schema({
    user_id: { type: String },
    bomdod: { type: Number }, 
    peshin: { type: Number }, 
    asr: { type: Number }, 
    shom: { type: Number }, 
    xufton: { type: Number },   
    vitr: { type: Number },   
    fasting: { type: Boolean }, // ro'za kunlari soni
    created_at: { type: Date, required: true } 
})

let Daily = mongoose.model('daily', DailySchema )

module.exports = Daily