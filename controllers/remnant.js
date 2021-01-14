let Remnant = require("./../models/remnant")
let User = require("./../models/user")
module.exports.create = ( req,res ) => {
    res.send("post remnant")
}

module.exports.getInfo = (req,res) => {
    let data = {}
    Remnant.findOne({user_id:req.params.user_id}).lean().then( async (result) => {
        let data = result
        let user = await User.findById(result.user_id)
        data.initial_total_namaz = user.initial_total_namaz
        data.initial_total_fasting = user.initial_total_fasting
        data.initial_bomdod = user.initial_bomdod
        data.initial_peshin = user.initial_peshin
        data.initial_asr = user.initial_asr
        data.initial_shom = user.initial_shom
        data.initial_xufton = user.initial_xufton
        data.initial_vitr = user.initial_vitr

        res.status(200).json(data)
    })
}

module.exports.getAll = (req,res) => {
    Remnant.find().then((result) => {
        res.status(200).json(result)
    })
}