let router = require("express").Router()
let controller = require("./../controllers/remnant")

router.route('/')
    .post( controller.create );

router.route('/info/:user_id')
    .get( controller.getInfo )    

router.route('/getAll')
    .get( controller.getAll );

module.exports = router