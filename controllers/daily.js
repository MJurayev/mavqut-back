let Daily = require("./../models/daily")
let User = require("./../models/user")
let Remnant = require("./../models/remnant")

const cron = require('node-cron');
const ErrorHandler = require("../utils/errorHandler");
const user = require("./../models/user");

module.exports.createDailyInfo = async ( req,res ) => { // kunlik roza malumotlarini kamaytira olmasligi shart !!!
    let body = req.body
    
    let currentData = await Daily.findOne({ user_id: req.user_id, '$where': 'this.created_at.toJSON().slice(0, 10) == "'+ (new Date( body.created_at )).toJSON().slice(0,10) +'"' })
    let currentRemnantData = await Remnant.findOne({ user_id: req.user_id, '$where': 'this.created_at.toJSON().slice(0, 10) == "'+ (new Date( body.created_at )).toJSON().slice(0,10) +'"' })

    let mustChangeData = {
        bomdod: body.bomdod,
        peshin: body.peshin,
        asr: body.asr,
        shom: body.shom,
        xufton: body.xufton,
        vitr: body.vitr, 
        fasting: body.fasting // boolean
    }
    await Daily.findOneAndUpdate(
        { user_id: req.user_id, '$where': 'this.created_at.toJSON().slice(0, 10) == "'+ (new Date( body.created_at )).toJSON().slice(0,10) +'"' },
        { $set: mustChangeData },{ new: true }).then( async (r) => {
        let remnantChangeData = {
            bomdod: currentRemnantData.bomdod - (body.bomdod - currentData.bomdod ),
            peshin: currentRemnantData.peshin - (body.peshin - currentData.peshin ),
            asr: currentRemnantData.asr - (body.asr - currentData.asr ),
            shom: currentRemnantData.shom - (body.shom - currentData.shom ),
            xufton: currentRemnantData.xufton - (body.xufton - currentData.xufton ),
            vitr: currentRemnantData.vitr - (body.vitr - currentData.vitr ), 
            // fasting: body.fasting
        }

        remnantChangeData.total_namaz = remnantChangeData.bomdod + remnantChangeData.peshin + remnantChangeData.asr + remnantChangeData.shom + remnantChangeData.xufton + remnantChangeData.vitr;

        if( currentData.fasting == false && body.fasting == true ) remnantChangeData.total_fasting = currentRemnantData.total_fasting-1;


        await Remnant.findOneAndUpdate(
            { user_id: req.user_id, '$where': 'this.created_at.toJSON().slice(0, 10) == "'+ (new Date( body.created_at )).toJSON().slice(0,10) +'"' },
            { $set: remnantChangeData },{ new: true }).then((r) => {
                
         res.status(200).json()

        }).catch(e => new ErrorHandler( e , res))


    }).catch(e => new ErrorHandler( console.log(e) , res))

    
}

module.exports.getDailyInfo = (req, res ) => {
    let body = req.body;
    Daily.findOne({ user_id: body.user_id, '$where': 'this.created_at.toJSON().slice(0, 10) == "'+ (new Date( body.created_at )).toJSON().slice(0,10) +'"' })
        .then( (r) => res.status(200).json(r) )
        .catch(e => new ErrorHandler( e , res))
}

module.exports.staticDailyJob = () => {
    
    cron.schedule('1 0 * * *', async () => {
        let users = await User.find();

        if( users && users.length > 0 ){
            for( let i=0;i<users.length;i++ ){
                let hasData = await Daily.findOne({ user_id: users[i]._id, '$where': 'this.created_at.toJSON().slice(0, 10) == "'+ (new Date()).toJSON().slice(0,10) +'"' })
                
                if( !hasData ){
                    let newDaily = { user_id: users[i]._id ,created_at: new Date(), bomdod: 0,peshin: 0,asr: 0,shom: 0,xufton: 0,vitr: 0, fasting: false };

                    await (new Daily(newDaily)).save()
                }
            }
        }
       
        console.log("--- Cron Job at " + (new Date()).toJSON().slice(0, 16) +" ---"); 
    });
      
}

module.exports.getAll = (req,res) => {
    Daily.find().then((result) => {
        res.status(200).json(result)
    })
}

module.exports.getUserDailies = (req,res) => {
    let user_id = req.user_id
    Daily.find({ user_id: user_id }).then((result) => {
        res.status(200).json(result)
    }).catch(e => new ErrorHandler( e , res))
}