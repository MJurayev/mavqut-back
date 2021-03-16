let Remnant = require("./../models/remnant")
const Daily = require('../models/daily')
let User = require("./../models/user")
module.exports.create =async ( req,res ) => {
    const searchDate = String(req.body.created_at).slice(0,10)
    console.log(searchDate)
    const daily  = await Daily.aggregate([{
            $match:{
                user_id:{$eq:req.user_id}
            }
        }
    ])
    console.log(daily)
    if(!daily){
        const dailyNew =  new Daily(req.body)
        const saved = await dailyNew.save()
        if(saved)return res.send({success:true})
    }else{
        console.log(daily)
        console.log(req.body)
        const updated =await Daily.findByIdAndUpdate(daily._id, req.body, {new:true})

        if(updated)res.send({success:true})
    }
        return res.send({success:false})
}

module.exports.getInfo = (req,res) => {
    let data = {}
    Remnant.findOne({user_id:req.user_id}).lean().then( async (result) => {
        let data = result
        let user = await User.findById(result.user_id)
        data.const_total_namaz = user.const_total_namaz
        data.const_total_fasting = user.const_total_fasting
        data.const_bomdod = user.const_bomdod
        data.const_peshin = user.const_peshin
        data.const_asr = user.const_asr
        data.const_shom = user.const_shom
        data.const_xufton = user.const_xufton
        data.const_vitr = user.const_vitr

        res.status(200).json(data)
    })
}

module.exports.getAll = (req,res) => {
    Remnant.find().then((result) => {
        res.status(200).json(result)
    })
}