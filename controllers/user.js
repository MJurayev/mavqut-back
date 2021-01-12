const ErrorHandler = require("../utils/errorHandler")
let User = require("./../models/user")
let Remnant = require("./../models/remnant")

module.exports.create = ( req,res ) => {

    let body = req.body

    let bodyUser = {
        name: body.name,
        surname: body.surname,
        age: body.age,
        gender: body.gender,
        email: body.email,
        phone: body.phone,
        password: body.password,
        avatar: "/avatar/" + body.icon,
        start_at_namaz: Number(body.start_at_namaz),
        start_at_fasting: Number(body.start_at_fasting), 
    }
    
    let {readyUser,secondaryUser} = User.generateAutomaticAttributes(bodyUser)

    let newUser = new User(readyUser);
    newUser.save().then( async (r) => {
        let newRemnant = new Remnant({...secondaryUser, user_id: r._id })
        await newRemnant.save()
        
        let token = User.generateToken(r) 
        res.status(200).json({token});

    }).catch(e => new ErrorHandler(e,res) )

}

module.exports.update = (req,res) => {
    let id = ( req.params.id ).toString()
    let body = req.body

    User.findByIdAndUpdate(id,{$set:body},{new:true}).then( (r) => {
        res.status(200).json(r)
    }).catch(e => new ErrorHandler(e,res) )
}

module.exports.getAll = (req,res) => {
    User.find().then((result) => {
        res.status(200).json(result)
    })
}

module.exports.login = (req,res) => {
    let body = req.body

    User.findOne({ phone: body.phone, password: body.password }).then( (r) => {
        if( !r ) return new ErrorHandler("Access denied !", res)
        // let userInfo = User.getUserInfo(r)
        let token = User.generateToken(r) 
        res.status(200).json({token});
    }).catch(e => new ErrorHandler(e,res) )
}

module.exports.verify = (req, res) => {
    res.status(200).json({ user_id: req.user_id })
}

module.exports.info = (req,res) => {
    let id = req.user_id

    User.findById(id).then((r) => {
        if( !r ) return new ErrorHandler("Access denied !", res)
        let userInfo = User.getUserInfo(r) 

        res.status(200).json(userInfo)
    }).catch(e => new ErrorHandler(e,res) )
}