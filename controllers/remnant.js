let Remnant = require("./../models/remnant")
let User = require("./../models/user")
module.exports.create = ( req,res ) => {
    res.send("post remnant")
}

module.exports.getInfo = (req,res) => {
    let data = {}
    Remnant.findOne({user_id:req.reqUser}).lean().then( async (result) => {
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