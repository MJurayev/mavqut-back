let router = require("express").Router()
let controller = require("./../controllers/daily")
const CheckAuth = require("./../middlewares/check-auth")

router.route('/')
    .post( CheckAuth, controller.createDailyInfo )

router.route('/user/getAll')
    .get( CheckAuth, controller.getUserDailies )

router.route('/info')
    .post( controller.getDailyInfo )

router.route('/getAll')
    .get( controller.getAll );
    
module.exports = router