let router = require("express").Router()
let controller = require("./../controllers/daily")

router.route('/')
    .post( controller.createDailyInfo )


router.route('/info')
    .post( controller.getDailyInfo )

router.route('/getAll')
    .get( controller.getAll );
    
module.exports = router