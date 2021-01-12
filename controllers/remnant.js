let Remnant = require("./../models/remnant")

module.exports.create = ( req,res ) => {
    res.send("post remnant")
}

module.exports.getInfo = (req,res) => {
    Remnant.findOne({user_id:req.params.user_id}).then((result) => {
        res.status(200).json(result)
    })
}

module.exports.getAll = (req,res) => {
    Remnant.find().then((result) => {
        res.status(200).json(result)
    })
}